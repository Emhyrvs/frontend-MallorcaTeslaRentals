import { Client } from './client.model';
import { Location } from './location.model';
import { Car } from './car.model';

export interface Reservation {
  id: string;
  returnLocation: Location;
  returnLocationId: string;
  pickupLocation: Location;
  pickupLocationId: string;
  startDate: Date;
  endDate: Date;
  client: Client;
  clientId: string;
  car: Car;
  carId: string;
  totalCost: number;
}
