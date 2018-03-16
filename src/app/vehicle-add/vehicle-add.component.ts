import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectVehicleComponent } from '../select-vehicle/select-vehicle.component';
import { VehicleDataService } from '../vehicledata.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Years, Make, Model } from '../vehicleDataInterface';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {


  @ViewChild('instance') instance: NgbTypeahead;


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? ''
        : this.makes.filter(v => v.Make_Name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatter = (x: { Make_Name: string }) => x.Make_Name;


  addVehicleForm: FormGroup;

  vehicles: Vehicle[];
  years: Years;
  yearsArray: Array<String>;
  keys: String[];
  models: Model;
  makes: Make[] = Array<Make>();
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
      name: ['', Validators.required],
      year: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
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
      this.addVehicleForm.patchValue({ user: this.user });
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
        this.makes = resp.body.Results;
      });
  }

  getModelsforYearandMake(selectedYear: String, selectedMake: String) {
    this.vehicleDataService.getModelsforYearandMake(selectedYear, selectedMake)
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.models = resp.body;
      });
  }

  manufacturerChanged(e: NgbTypeaheadSelectItemEvent) {
    const manufacturer = e.item.Make_Name;
    const year = this.addVehicleForm.get('year').value;
    this.getModelsforYearandMake(year, manufacturer);
  }

  submitForm() {
    if (this.addVehicleForm.invalid) {
      for (var i in this.addVehicleForm.controls) {
        this.addVehicleForm.controls[i].markAsTouched();
      }
    } else {
      if (this.downloadURL != null) {
        this.addVehicleForm.patchValue({ image: this.downloadURL });
        this.vehicleService.saveVehicle(this.addVehicleForm.value);
        this.router.navigate(['/vehicles']);
      } else {
        
      }
    }
  }

  uploadFile(event) {
    this.vehicleService.uploadImage(event).subscribe(url => this.downloadURL = url);
  }

  get name() { return this.addVehicleForm.get('name'); }
  get year() { return this.addVehicleForm.get('year'); }
  get model() { return this.addVehicleForm.get('model'); }
  get manufacturer() { return this.addVehicleForm.get('manufacturer'); }
  get image() { return this.addVehicleForm.get('image'); }
}
