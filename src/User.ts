import faker from 'faker';

/* convention in TS is to NOT use default exports */
export class User {
  userName: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.userName = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
  markerContent(): string {
    return `User Name: ${this.userName}`;
  }
}
