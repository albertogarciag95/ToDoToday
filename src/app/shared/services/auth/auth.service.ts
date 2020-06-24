import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from '../../dialogs/info-dialog/info-dialog';
import { AppEndpoints } from 'src/app/app-endpoints';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  static API_END_POINT = environment.API;

  private userSource = new BehaviorSubject<any>("");
  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { }

  login(body: object) {
    return this.http.post(AuthService.API_END_POINT + AppEndpoints.LOGIN, body, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError((error: any) => {
          if(error.status === 500) {
            this._handleError(error);
            return of(null);
          }
          return of(error);
        })
    );
  }

  generateToken(): Observable<any> {
    return this.http.post(AuthService.API_END_POINT + AppEndpoints.TOKEN, {}, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError((error: any) => {
          this._handleError(error);
          return of(error);
        })
    );
  }

  logout() {
    return this.http.delete(AuthService.API_END_POINT + AppEndpoints.TOKEN, this.createOptions())
      .pipe(
        map(() => this.userSource.next("")),
        catchError((error: any) => {
          if(error.status === 500) {
            this._handleError(error);
            return of(null);
          }
          return of(error);
        })
      );
  }

  updateUserLogged(userLogged) {
    this.userSource.next({...userLogged});
  }

  private _handleError(error: HttpErrorResponse) {
    if(error.status === 401 || error.status === 403) {
      this.router.navigateByUrl('/login');
    }
    if(error.status === 403 && error.error === 'Token expired') {
      this.updateUserLogged(undefined);
      this._snackBar.open('¡Tu sesión ha expirado!', 'Ok', {
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
      observe: 'response',
      withCredentials: true
    };
    return options;
  }
}
