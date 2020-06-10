import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () =>
    import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'create-itinerary', loadChildren: () =>
    import('./create-itinerary/create-itinerary.module').then(mod => mod.CreateItineraryModule) },
  { path: 'results', loadChildren: () =>
    import('./results/results.module').then(mod => mod.ResultsModule) },
  { path: 'new-user', loadChildren: () =>
    import('./register/register.module').then(mod => mod.RegisterModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})

export class AppRoutingModule { }
