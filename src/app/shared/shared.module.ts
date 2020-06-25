import {NgModule} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';

import { InfoDialog } from './dialogs/info-dialog/info-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';

@NgModule({
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [ HttpService, AuthService, AuthGuardService ],
  declarations: [InfoDialog]
})
export class SharedModule { }
