import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { AppEndpoints } from '../../app-endpoints';

import { HttpService } from './http.service';
import { User } from '../models/user';


@Injectable({ providedIn: 'any' })
export class UserService {

  constructor(private httpService: HttpService) { }

  addNewUser(user: User): Observable<User> {
    return this.httpService.post(AppEndpoints.USERS, user);
  }
}
