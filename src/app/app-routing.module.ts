import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full'},
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/add', component: VehicleAddComponent },
  { path: 'vehicles/detail/:id', component: VehicleDetailComponent },
  { path: 'vehicles/detail/:id/addMaintenance', component: AddMaintenanceComponent },
  { path: 'vehicles/detail/:id/maintenanceList', component: MaintenanceListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}