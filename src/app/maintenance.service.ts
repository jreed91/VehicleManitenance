import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Maintenance } from './maintenance';
import { MAINTENANCEITEMS } from './mock-maintenance';

@Injectable()
export class MaintenanceService {
  constructor() { }

  getMaintenanceItemsForVehicle(vehicleId: number): Observable<Maintenance[]> {
    console.log(MAINTENANCEITEMS);
    return of(MAINTENANCEITEMS.filter(mainteance => mainteance.vehicle = vehicleId));
  }

}
