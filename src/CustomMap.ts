// import { User } from './User';
// import { Company } from './Company';

/* creating an interface to make objects conform to criteria for addMarker */
interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
}

export class CustomMap {
  /* removing access to Google Maps methods from outside the class */
  private googleMap: google.maps.Map;

  /* instantiating a new Map */
  constructor(elementId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(elementId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  // /* adding a method to create a user marker */
  // addUserMarker(user: User): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: user.location.lat,
  //       lng: user.location.lng,
  //     },
  //   });
  // }

  // /* method to create company marker */
  // addCompanyMarker(company: Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng,
  //     },
  //   });
  // }

  /* refactoring the above methods to allow for re-use */
  addMarker(mappable: Mappable /* User | Company */): void {
    /* in this case, because both User and Company share the location prop,
       TS infers that we want to access that from both */
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
  }
  /*
  this ^^ is still not an ideal approach because it
  would require importing EVERY class we might use
  */
}
