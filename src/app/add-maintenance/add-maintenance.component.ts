import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from '../maintenance.service';
import {IMyDpOptions} from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MaintenanceType } from '../maintenance';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
export class AddMaintenanceComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    openSelectorOnInputClick: true,
    inline: false,
    editableDateField: false
};

  addMaintenanceForm: FormGroup;
  maintenanceTypes: MaintenanceType[];

  constructor(private router: Router, 
    private fb: FormBuilder,
  private maintenanceService: MaintenanceService,
  private route: ActivatedRoute) {
    this.createForm();
   }

   createForm() {
    this.addMaintenanceForm = this.fb.group({
      date: [null],
      mileage: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      type: [],
      vehicle: ['', Validators.required],
      futuredate: [null],
      futuremiles: ''
    });
  }

  ngOnInit() {
    this.getMaintenanceTypes();
    console.log(this.maintenanceTypes);
  }

  getMaintenanceTypes(): void {
    this.maintenanceService.getAllMaintenanceTypes()
    .subscribe(maintenanceTypes => this.maintenanceTypes = maintenanceTypes);
  }


  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.addMaintenanceForm.patchValue({date: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
}

clearDate(): void {
    // Clear the date using the patchValue function
    this.addMaintenanceForm.patchValue({date: null});
}

submitForm() {
  if (this.addMaintenanceForm.invalid) {
    for (var i in this.addMaintenanceForm.controls) {
      this.addMaintenanceForm.controls[i].markAsTouched();
    }
  } else {
    const id = this.route.snapshot.paramMap.get('id');
    this.addMaintenanceForm.patchValue({vehicle: id});
    this.maintenanceService.saveMaintenance(this.addMaintenanceForm.value);
    this.router.navigate(['/vehicles/detail/' + id]);
  }
 
}

get date() { return this.addMaintenanceForm.get('date'); }
get mileage() { return this.addMaintenanceForm.get('mileage'); }
get location() { return this.addMaintenanceForm.get('location'); }
get price() { return this.addMaintenanceForm.get('price'); }
get vehicle() { return this.addMaintenanceForm.get('vehicle'); }
}
