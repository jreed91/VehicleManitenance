import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Maintenance } from './maintenance';
import { MAINTENANCEITEMS } from './mock-maintenance';

@Injectable()
export class MaintenanceService {
  private maintenanceCollection: AngularFirestoreCollection<Maintenance>;
  private maintenanceDoc: AngularFirestoreDocument<Maintenance>;
  maintenance: Observable<Maintenance>;
  maintenanceItems: Observable<Maintenance[]>;

  constructor(private afs: AngularFirestore) { 
    this.maintenanceCollection = afs.collection<Maintenance>('Maintenance');
  }

  getMaintenanceItemsForVehicle(vehicleId: string): Observable<Maintenance[]> {
    return this.afs.collection<Maintenance>('Maintenance', ref => ref.where('vehicle', '==', vehicleId)).valueChanges();
  }

  getAllMaintenanceTypes(): Observable<String[]> {
    return of(MAINTENANCEITEMS.map(value => value.type).filter((value, index, self) => self.indexOf(value) === index));
  }

  saveMaintenance(maintenance: Maintenance): void {
    this.maintenanceCollection.add(maintenance);
  }

}
