import {NgModule} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';

import { InfoDialog } from './dialogs/info-dialog/info-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ HttpService, AuthService ],
  declarations: [InfoDialog]
})
export class SharedModule { }
