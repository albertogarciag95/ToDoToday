import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ResultsComponent } from './components/results.component';
import { MapComponent } from './components/map/component/map.component';
import { OptionsComponent } from './components/options/options.component';
import { DetailsComponent } from './components/details/details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: ResultsComponent }
];

@NgModule({
  declarations: [
    ResultsComponent,
    MapComponent,
    OptionsComponent,
    DetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTabsModule,
    MatButtonModule
  ],
  exports: [ RouterModule ]
})

export class ResultsModule {}
