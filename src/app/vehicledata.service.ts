import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Vehicle } from './vehicle';
import { HttpResponse } from '@angular/common/http/src/response';
import { Years, Make, Model } from './vehicleDataInterface';

@Injectable()
export class VehicleDataService {
  baseUrl: String;
  years: Years;

  constructor(private http: HttpClient) {
    this.getYears();
    this.baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/';
}

  getYears(): Years {
    var date = new Date()
    var thisYear = date.getFullYear().toString();
    this.years = {min_year: "1941", max_year: thisYear};

    return this.years
  }

  getMakes(): Observable<HttpResponse<Make>> {
    return this.http.get<Make>(this.baseUrl + 'getallmakes?format=json', {observe: 'response'});
  }

  getModelsforYearandMake(year: String, make: String): Observable<HttpResponse<Model>> {
    return this.http.get<Model>(this.baseUrl + 'getmodelsformakeyear/make/' + make + '/modelyear/' + year + '?format=json', {observe: 'response'});
  }
}
