import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Vehicle } from './vehicle';
import { VEHICLES } from './mock-vehicles';

@Injectable()
export class VehicleService {
  private vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  private vehicleDoc: AngularFirestoreDocument<Vehicle>;
  vehicle: Observable<Vehicle>;
  vehicles: Observable<Vehicle[]>;

  constructor(private afs: AngularFirestore) {
    this.vehiclesCollection = afs.collection<Vehicle>('vehicles');
    this.vehicles = this.vehiclesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
   }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles;
  }

  getVehicle(id: string): Observable<Vehicle> {
    this.vehicleDoc = this.afs.doc<Vehicle>('/vehicles/' + id);
    return this.vehicle = this.vehicleDoc.valueChanges();
  }

  saveVehicle(vehicle: Vehicle): void {
    this.vehiclesCollection.add(vehicle);
  }
}
