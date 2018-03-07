import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
import { MyDatePickerModule } from 'mydatepicker';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { LastServiceComponent } from './last-service/last-service.component';
import { NextServiceComponent } from './next-service/next-service.component';


@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleDetailComponent,
    MaintenanceDetailComponent,
    MaintenanceListComponent,
    VehicleAddComponent,
    SelectVehicleComponent,
    AddMaintenanceComponent,
    LastServiceComponent,
    NextServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [VehicleService, VehicleDataService, VehicleAddComponent, MaintenanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
