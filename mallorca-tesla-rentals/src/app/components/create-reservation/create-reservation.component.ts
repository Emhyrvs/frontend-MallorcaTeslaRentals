import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from 'src/app/models/reservation.model';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  reservationForm: FormGroup;
  locations: any[] = [];
  cars: any[] = [];
  client: Client | undefined;
  totalCost:number = 0; 

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {
    this.reservationForm = this.formBuilder.group({
      startDate: ['', [Validators.required, this.startDateValidator.bind(this)]],
      endDate: ['', [Validators.required, this.endDateValidator.bind(this)]],
      pickupLocation: ['', Validators.required],
      returnLocation: ['', Validators.required],
      car: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      personalIdentificationNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    }, { validator: this.dateRangeValidator.bind(this) });
  }

  ngOnInit(): void {
    this.reservationService.getCars().subscribe(data => {
      this.cars = data;
    });
    this.reservationService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  private generateUUID(): string {
    // Generowanie losowego UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  startDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const startDate = new Date(control.value);
    if (startDate <= today) {
      return { 'startDateInvalid': true };
    }
    return null;
  }

  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDateControl = this.reservationForm?.get('startDate');
    if (!startDateControl) {
      return null;
    }
    const startDate = new Date(startDateControl.value);
    const endDate = new Date(control.value);
    if (startDate && endDate <= startDate) {
      return { 'endDateInvalid': true };
    }
    return null;
  }

  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = new Date(group.get('startDate')?.value);
    const endDate = new Date(group.get('endDate')?.value);
    if (startDate >= endDate) {
      return { 'dateRangeInvalid': true };
    }
    return null;
  }

  onSubmit(): void {
    console.log('Submitting form...');
    if (this.reservationForm.valid) {
      const formData: Reservation = this.reservationForm.value;
      formData.carId = formData.car.id;
      formData.pickupLocationId = formData.pickupLocation.id;
      formData.returnLocationId = formData.returnLocation.id;

      // Konwersja dat na obiekty Date
const startDate = new Date(formData.startDate);
const endDate = new Date(formData.endDate);

// Różnica w dniach między startDate a endDate
const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// Obliczenie całkowitego kosztu
this.totalCost = diffDays * formData.car.priceForDay;
formData.totalCost = this.totalCost;

      this.client = new Client({
        id: this.generateUUID(),
        name: this.reservationForm.value.name,
        lastName: this.reservationForm.value.lastName,
        personalIdentificationNumber: this.reservationForm.value.personalIdentificationNumber,
        phoneNumber: this.reservationForm.value.phoneNumber, 
        
      });

      formData.client = this.client;

      this.reservationService.addReservation(formData).subscribe(
        response => {
          console.log('Reservation created successfully:', response);
        },
        error => {
          console.error('Error creating reservation:', error);
        }
      );
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }
}
