import { Component, OnInit } from '@angular/core';
import { SelectVehicleComponent } from '../select-vehicle/select-vehicle.component';
import { VehicleDataService } from '../vehicledata.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  addVehicleForm: FormGroup;

  vehicles: Vehicle[];
  years: String[];
  keys: String[];
  manufacturersAfterChangeEvent = [];
  modelsAfterChangeEvent = [];
  trimsAfterChangeEvent = [];

  constructor(private fb: FormBuilder,
    private vehicleDataService: VehicleDataService,
  private vehicleService: VehicleService) {
      this.createForm();
    }

  createForm() {
    this.addVehicleForm = this.fb.group({
      name: '',
      year: '',
      manufacturer: '',
      model: '',
      trim: ''
    });
  }

  ngOnInit() {
    this.getManufacturers();
    this.getYears();
    this.keys = Object.keys(this.vehicles);
  }

  getManufacturers(): void {
    this.vehicleDataService.getVehicleData()
    .subscribe(vehicles => this.vehicles = vehicles);
  }

  getYears(): void {
    this.vehicleDataService.getYears()
    .subscribe(years => this.years = years);
  }

  yearChanged() {
    const year = this.addVehicleForm.get('year').value;
    this.manufacturersAfterChangeEvent = this.vehicles.filter(p => p.year == year);
  }

  manufacturerChanged() {
    const manufacturer = this.addVehicleForm.get('manufacturer').value;
    this.modelsAfterChangeEvent = this.vehicles.filter(p => p.manufacturer == manufacturer);
  }

  modelChanged() {
    const model = this.addVehicleForm.get('model').value;
    this.trimsAfterChangeEvent = this.vehicles.filter(p => p.model == model);
  }

  submitForm() {
    console.log(this.addVehicleForm.value);
    this.vehicleService.saveVehicle(this.addVehicleForm.value);
  }

}
