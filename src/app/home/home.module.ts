import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  exports: [ RouterModule ]
})

export class HomeModule { }
