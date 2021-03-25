import faker from 'faker';
import { Mappable } from './CustomMap';

/* convention in TS is to NOT use default exports */
export class User implements Mappable {
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
