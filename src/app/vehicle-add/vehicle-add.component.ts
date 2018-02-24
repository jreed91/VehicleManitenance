import { Component, OnInit } from '@angular/core';
import { SelectVehicleComponent } from '../select-vehicle/select-vehicle.component';
import { VehicleDataService } from '../vehicledata.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Years, Make } from '../vehicleDataInterface';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  addVehicleForm: FormGroup;

  vehicles: Vehicle[];
  years: Years;
  makes: Make;
  yearsArray: Array<String>;
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
    this.yearsArray = [];
    this.addVehicleForm = this.fb.group({
      id: '',
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
    this.getMakes();
    this.keys = Object.keys(this.vehicles);
  }

  getManufacturers(): void {
    this.vehicleDataService.getVehicleData()
    .subscribe(vehicles => this.vehicles = vehicles);
  }

  getYears(): void {
    this.years = this.vehicleDataService.getYears();
    this.buildYearsArray(this.years);
  }

  buildYearsArray(years: Years) {
    let i: number;
    for (i = +years.min_year; i <= +years.max_year; i++) {
      this.yearsArray.push(i.toString());
    }
  }

  getMakes(): void {
    this.vehicleDataService.getMakes()
    .subscribe(resp => {
      const keys = resp.headers.keys();
      // access the body directly, which is typed as `Config`.
      this.makes = resp.body;
    });
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
    this.vehicleService.saveVehicle(this.addVehicleForm.value);
  }

}
