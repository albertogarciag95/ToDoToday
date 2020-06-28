import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { AppEndpoints } from '../app-endpoints';
import { AuthService } from '../shared/services/auth/auth.service';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class ProfileService {

  constructor(private httpService: HttpService, private authService: AuthService) { }

  getUserInfo(): Observable<User> {
    const { userName } = this.authService.isUserLogged();
    return this.httpService.get(AppEndpoints.USERS + '/' + userName);
  }

}
