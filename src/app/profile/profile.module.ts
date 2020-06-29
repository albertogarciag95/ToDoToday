import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BarRatingModule } from 'ngx-bar-rating';

const routes: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  declarations: [ ProfileComponent ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatTableModule,
    BarRatingModule
  ]
})

export class ProfileModule { }
