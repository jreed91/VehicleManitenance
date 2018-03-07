import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-next-service',
  templateUrl: './next-service.component.html',
  styleUrls: ['./next-service.component.css']
})
export class NextServiceComponent implements OnInit {
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
  }
  
}
