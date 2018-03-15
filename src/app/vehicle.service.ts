import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Vehicle } from './vehicle';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';



@Injectable()
export class VehicleService {
  private vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  private vehicleDoc: AngularFirestoreDocument<Vehicle>;
  vehicle: Observable<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  user: String;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage) {
    this.user = this.afAuth.auth.currentUser.uid;
    this.vehiclesCollection = afs.collection<Vehicle>('vehicles', ref => ref.where('user', '==', this.user));
   }

  getVehicles(): Observable<Vehicle[]> {
    this.vehicles = this.vehiclesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.vehicles;
  }

  getVehicle(id: string): Observable<Vehicle> {
    this.vehicleDoc = this.afs.doc<Vehicle>('/vehicles/' + id);
    return this.vehicle = this.vehicleDoc.valueChanges();
  }

  saveVehicle(vehicle: Vehicle): void {
    this.vehiclesCollection.add(vehicle);
  }

  uploadImage(event): Observable<String> {
    const file = event.target.files[0];
    const filename = file.name;
    const filePath = this.user + '/images/' + filename;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
     this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();

   


    return this.downloadURL;
  }
}
