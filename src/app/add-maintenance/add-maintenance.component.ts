import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MaintenanceService } from '../maintenance.service';
import {IMyDpOptions} from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
export class AddMaintenanceComponent implements OnInit {
  

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
};

  addMaintenanceForm: FormGroup;
  maintenanceTypes: String[];

  constructor(private fb: FormBuilder,
  private maintenanceService: MaintenanceService,
  private route: ActivatedRoute) {
    this.createForm();
   }

   createForm() {
    this.addMaintenanceForm = this.fb.group({
      date: [null],
      mileage: '',
      location: '',
      price: '',
      type: [],
      vehicle: ''
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
  const id = this.route.snapshot.paramMap.get('id');
  this.addMaintenanceForm.patchValue({vehicle: id});
  this.maintenanceService.saveMaintenance(this.addMaintenanceForm.value);
}

}
