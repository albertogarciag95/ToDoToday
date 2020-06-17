import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { AppEndpoints } from '../../app-endpoints';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'any' })
export class UserService {

  constructor(private httpService: HttpService) { }

  addNewUser(user: FormData): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const options: any = { headers };
    return this.httpService.post(AppEndpoints.USERS, user, options);
  }

  login(user: any): Observable<any> {
    return this.httpService.login(AppEndpoints.LOGIN, user);
  }
}
