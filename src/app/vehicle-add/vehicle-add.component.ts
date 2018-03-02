import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectVehicleComponent } from '../select-vehicle/select-vehicle.component';
import { VehicleDataService } from '../vehicledata.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Years, Make, Model } from '../vehicleDataInterface';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';

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
  models: Model;
  user: String;
  downloadURL: String;

  manufacturersAfterChangeEvent = [];
  modelsAfterChangeEvent = [];
  trimsAfterChangeEvent = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private vehicleDataService: VehicleDataService,
  private vehicleService: VehicleService,
  public afAuth: AngularFireAuth) {
      this.createForm();
    }

  createForm() {
    this.yearsArray = [];
    this.addVehicleForm = this.fb.group({
      name: '',
      year: '',
      manufacturer: '',
      model: '',
      user: '',
      image: ''
    });
  }

  ngOnInit() {
    this.getYears();
    this.getMakes();
    this.getUser();
  }

  getUser(): void {
    this.afAuth.authState.subscribe(User => {
      this.user = User.uid;
      this.addVehicleForm.patchValue({user: this.user});
    });
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

  getModelsforYearandMake(selectedYear: String, selectedMake: String) {
    this.vehicleDataService.getModelsforYearandMake(selectedYear, selectedMake)
    .subscribe(resp => {
      const keys = resp.headers.keys();
      this.models = resp.body;
    });
  }

  manufacturerChanged() {
    const manufacturer = this.addVehicleForm.get('manufacturer').value;
    const year  = this.addVehicleForm.get('year').value;
    this.getModelsforYearandMake(year, manufacturer);
  }

  submitForm() {
    if (this.downloadURL != null) {
      this.addVehicleForm.patchValue({image: this.downloadURL});
      this.vehicleService.saveVehicle(this.addVehicleForm.value);
    this.router.navigate(['/vehicles']);
    }
    
  }

  uploadFile(event) {
    this.vehicleService.uploadImage(event).subscribe(url => this.downloadURL = url);
  }

}
