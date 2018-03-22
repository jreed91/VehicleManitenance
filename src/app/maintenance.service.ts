import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Maintenance, MaintenanceType } from './maintenance';


@Injectable()
export class MaintenanceService {
  private maintenanceCollection: AngularFirestoreCollection<Maintenance>;
  private maintenanceDoc: AngularFirestoreDocument<Maintenance>;
  maintenance: Observable<Maintenance>;
  maintenanceItems: Observable<Maintenance[]>;
  maintenanceTypes: Observable<MaintenanceType[]>;
  maintenanceTypesCollection: AngularFirestoreCollection<MaintenanceType>;

  constructor(private afs: AngularFirestore) { 
    this.maintenanceCollection = afs.collection<Maintenance>('Maintenance');
    this.maintenanceTypesCollection = afs.collection<MaintenanceType>('MaintenanceType');
    this.maintenanceTypes = this.maintenanceTypesCollection.valueChanges();
  }

  getMaintenanceItemsForVehicle(vehicleId: string): Observable<Maintenance[]> {
    return this.afs.collection<Maintenance>('Maintenance', ref => ref.where('vehicle', '==', vehicleId)).valueChanges();
  }

  getLastMaintenanceItemForVehicle(vehicleId: string): Observable<Maintenance[]> {
    return this.afs.collection<Maintenance>('Maintenance', ref => ref.where('vehicle', '==', vehicleId).orderBy('date').limit(1)).valueChanges();
  }

  getAllMaintenanceTypes(): Observable<MaintenanceType[]> {
    return this.maintenanceTypes;
  }

  saveMaintenance(maintenance: Maintenance): void {
    this.maintenanceCollection.add(maintenance);
  }

}
