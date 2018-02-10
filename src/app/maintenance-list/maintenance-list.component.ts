import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  @Input() vehicle: number;
  maintenaceItems: Maintenance[];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.getMaintenanceItemsForVehicle(this.vehicle);
  }
  getMaintenanceItemsForVehicle(vehicleId: number): void {
    this.maintenanceService.getMaintenanceItemsForVehicle(vehicleId)
    .subscribe(maintenaceItems => this.maintenaceItems = maintenaceItems);
  }
}
