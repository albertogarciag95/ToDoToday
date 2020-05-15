import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateItineraryComponent } from './components/create-itinerary.component';
import { CreateItineraryService } from './service/create-itinerary.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MapComponent } from './components/map/component/map.component';
import { FormSelectorComponent } from './components/form-fields/form-selector/form-selector.component';
import { OptionsComponent } from './components/options/options.component';
import { FormLocationComponent } from './components/form-fields/form-location/form-location.component';


const routes: Routes = [
  { path: '', component: CreateItineraryComponent }
];

@NgModule({
  declarations: [
    CreateItineraryComponent,
    MapComponent,
    FormSelectorComponent,
    OptionsComponent,
    FormLocationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  providers: [ CreateItineraryService ],
  exports: [ RouterModule ]
})

export class CreateItineraryModule {}
