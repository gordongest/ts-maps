// import { User } from './User';
// import { Company } from './Company';


/* creating an interface to make objects conform to criteria for addMarker */
export interface Mappable {
  /*
    by exporting the interface, it can be imported into class files
    where the class definition can implement it, allowing TS to
    highlight errors in interface conformity
  */
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  // color: string; // throws error in class files when active
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

  /* refactoring the above methods to allow for code re-use */
  addMarker(mappable: Mappable /* User | Company */): void {
    /* in this case, because both User and Company share the location prop,
       TS infers that we want to access that from both */

    /* assigning the map instance to a variable allows access to its methods */
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    /* now event listeners are available */
    marker.addListener('click', () => {
      /* on click, create a new info window */
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      /* open info window, pass it the current map and marker */
      infoWindow.open(this.googleMap, marker);
    });
  }
  /*
  this ^^ is still not an ideal approach because it
  would require importing EVERY class we might use
  */
}
