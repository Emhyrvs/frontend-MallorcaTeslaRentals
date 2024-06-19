export class Client {
  id: string; // Może być generowane automatycznie lub wypełnione w zależności od logiki aplikacji
  name: string;
  lastName: string;
  personalIdentificationNumber: string;
  phoneNumber: string;

  constructor(data: any) {
    this.id = data.id; // Może być generowane automatycznie lub wypełnione w zależności od logiki aplikacji
    this.name = data.name || '';
    this.lastName = data.lastName || '';
    this.personalIdentificationNumber = data.personalIdentificationNumber || '';
    this.phoneNumber = data.phoneNumber || '';
  }
}
