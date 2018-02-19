import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
export class AddMaintenanceComponent implements OnInit {
  addMaintenanceForm: FormGroup;
  maintenanceTypes: String[];

  constructor(private fb: FormBuilder,
  private maintenanceService: MaintenanceService) {
    this.createForm();
   }

   createForm() {
    this.addMaintenanceForm = this.fb.group({
      date: '',
      mileage: '',
      location: '',
      price: '',
      type: []
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

}
