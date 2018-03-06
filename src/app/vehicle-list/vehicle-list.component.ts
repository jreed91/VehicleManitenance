import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { MaintenanceService } from '../maintenance.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Observable<Vehicle[]>;
  maintenance: Observable<any[]>;

  constructor(
    private vehicleService: VehicleService,
  private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicles = this.vehicleService.getVehicles();
    this.vehicleService.getVehicles().subscribe(vehicles =>
    vehicles.forEach(vehicle => {
      this.maintenance = this.maintenanceService.getLastMaintenanceItemForVehicle(vehicle.id);
    }))
  }
}
