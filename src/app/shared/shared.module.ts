import {NgModule} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../shared/services/http.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [ HttpService ]
})
export class SharedModule { }
