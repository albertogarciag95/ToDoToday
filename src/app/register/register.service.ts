import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { AppEndpoints } from '../app-endpoints';

import { HttpService } from '../shared/services/http/http.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'any' })
export class RegisterService {

  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  addNewUser(user: FormData): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const options: any = { headers };
    return this.httpService.post(AppEndpoints.USERS, user, options);
  }


}
