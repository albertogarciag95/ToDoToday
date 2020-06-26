import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../environments/environment';
import { InfoDialog } from '../../dialogs/info-dialog/info-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class HttpService {

  static API_END_POINT = environment.API;

  constructor(
      private http: HttpClient,
      public dialog: MatDialog,
      private snackBar: MatSnackBar,
      public router: Router,
      public authService: AuthService
  ) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  getForeign(endpoint: string): Observable<any> {
    const options = this.createOptions();
    delete options.withCredentials;
    return this.http.get(endpoint, options)
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  post(endpoint: string, body?: object, options?: object) {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, options || this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  put(endpoint: string, body: object) {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      this.router.navigateByUrl('/login');
    }
    if (error.status === 403 && error.error === 'Token expired') {
      this.authService.updateUserLogged(undefined);
      this.snackBar.open('¡Tu sesión ha expirado!', 'Ok', {
        duration: 2000,
      });
    } else {
      this.dialog.open(InfoDialog, { width: '650px', data: error });
    }
  }

  private createOptions(): any {
    const options: any = {
      headers: new HttpHeaders( { 'Content-Type': 'application/json' }),
      params: new HttpParams(),
      responseType: 'json',
      withCredentials: true,
      observe: 'response'
    };
    return options;
  }

}
