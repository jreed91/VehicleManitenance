import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  @Input() vehicle: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getVehicle();
  }

  getVehicle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicle(id)
      .subscribe(vehicle => this.vehicle = vehicle);
  }

}
