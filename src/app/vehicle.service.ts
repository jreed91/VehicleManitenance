import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Vehicle } from './vehicle';
import { VEHICLES } from './mock-vehicles';

@Injectable()
export class VehicleService {

  constructor() { }

  getVehicles(): Observable<Vehicle[]> {
    return of(VEHICLES);
  }

  getVehicle(id: number): Observable<Vehicle> {
    return of(VEHICLES.find(vehicle => vehicle.id === id));
  }

  saveVehicle(vehicle: Vehicle): void {
    VEHICLES.push(vehicle);
  }
}
