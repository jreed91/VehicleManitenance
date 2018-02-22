import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  maintenaceItems: Observable<Maintenance[]>;

  constructor(private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getMaintenanceItemsForVehicle();
  }
  getMaintenanceItemsForVehicle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.maintenaceItems = this.maintenanceService.getMaintenanceItemsForVehicle(id);
  }
}
