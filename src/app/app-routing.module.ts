import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/add', component: VehicleAddComponent },
  { path: 'vehicles/detail/:id', component: VehicleDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}