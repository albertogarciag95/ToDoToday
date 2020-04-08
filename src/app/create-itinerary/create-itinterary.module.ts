import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreateItineraryComponent } from './create-itinerary.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: CreateItineraryComponent }
];

@NgModule({
  declarations: [ CreateItineraryComponent ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [ RouterModule ]
})

export class CreateItineraryModule {}
