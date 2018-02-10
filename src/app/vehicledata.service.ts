import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { VEHICLEDATA } from './mock-vehicledata';
import { Vehicle } from './vehicle';

@Injectable()
export class VehicleDataService {

  years: String[];

  constructor() {
    this.years = [
    '1994',
    '1995',
    '1996',
    '1997'
  ];
}

  getYears(): Observable<String[]> {
    return of(this.years);
  }

  getVehicleData(): Observable<Vehicle[]> {
    return of(VEHICLEDATA);
  }
}
