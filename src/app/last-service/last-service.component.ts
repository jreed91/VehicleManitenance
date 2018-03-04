import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-last-service',
  templateUrl: './last-service.component.html',
  styleUrls: ['./last-service.component.css']
})
export class LastServiceComponent implements OnInit {
  maintenaceItem: Observable<Maintenance[]>;

  constructor(private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getLastMaintenanceItemForVehicle();
  }

  getLastMaintenanceItemForVehicle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.maintenaceItem = this.maintenanceService.getLastMaintenanceItemForVehicle(id);
    console.log(this.maintenaceItem);
  }


}
