import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { VehicleService } from './vehicle.service';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { VehicleDataService } from './vehicledata.service';


@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleDetailComponent,
    MaintenanceDetailComponent,
    MaintenanceListComponent,
    VehicleAddComponent,
    SelectVehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [VehicleService, VehicleDataService, VehicleAddComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
