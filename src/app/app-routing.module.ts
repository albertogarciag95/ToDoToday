import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './shared/services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'home', loadChildren: () =>
    import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'create-itinerary', loadChildren: () =>
    import('./create-itinerary/create-itinerary.module').then(mod => mod.CreateItineraryModule) },
  { path: 'results', loadChildren: () =>
    import('./results/results.module').then(mod => mod.ResultsModule),
    canActivate: [AuthGuard] },
  { path: 'new-user', loadChildren: () =>
    import('./register/register.module').then(mod => mod.RegisterModule) },
  { path: 'login', loadChildren: () =>
    import('./login/login.module').then(mod => mod.LoginModule) },
  { path: 'profile', loadChildren: () =>
    import('./profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})

export class AppRoutingModule { }
