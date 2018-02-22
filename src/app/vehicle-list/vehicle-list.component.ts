import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Observable<Vehicle[]>;

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicles = this.vehicleService.getVehicles();
  }
}
