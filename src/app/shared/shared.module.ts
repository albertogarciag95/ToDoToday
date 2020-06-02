import {NgModule} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../shared/services/http.service';
import { ErrorDialog } from './dialogs/error-dialog/error-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ HttpService ],
  declarations: [ErrorDialog]
})
export class SharedModule { }
