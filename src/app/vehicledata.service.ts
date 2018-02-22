import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { VEHICLEDATA } from './mock-vehicledata';
import { Vehicle } from './vehicle';

@Injectable()
export class VehicleDataService {
  baseUrl: String;


  years: String[];

  constructor() {
    this.years = [
    '1994',
    '1995',
    '1996',
    '1997'
  ];
  this.baseUrl = 'www.carqueryapi.com';
}

  getYears(): Observable<String[]> {
    return of(this.years);
  }

  getVehicleData(): Observable<Vehicle[]> {
    return of(VEHICLEDATA);
  }
}
