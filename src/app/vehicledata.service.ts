import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { VEHICLEDATA } from './mock-vehicledata';
import { Vehicle } from './vehicle';
import { HttpResponse } from '@angular/common/http/src/response';
import { Years } from './vehicleDataInterface';

@Injectable()
export class VehicleDataService {
  baseUrl: String;


  years: String[];

  constructor(private http: HttpClient) {
    this.getYears();
    this.baseUrl = 'https://www.carqueryapi.com/api/0.3/';
}

  getYears(): Observable<HttpResponse<Years>> {
    return this.http.get<Years>(this.baseUrl + '?cmd=getYears', {observe: 'response'});
  }

  getVehicleData(): Observable<Vehicle[]> {
    return of(VEHICLEDATA);
  }
}
