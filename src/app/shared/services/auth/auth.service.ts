import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../../dialogs/error-dialog/error-dialog';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static API_END_POINT = environment.API;

  private userSource = new BehaviorSubject<string>("");
  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient, public dialog: MatDialog) { }

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

  updateUserLogged(userLogged) {
    this.userSource.next(userLogged);
  }

  private _handleError(error: HttpErrorResponse) {
    console.error('ERROR: ', error);
    this.dialog.open(ErrorDialog, { width: '650px', data: error });
  }

  private createOptions(): any {
    const options: any = {
      headers: new HttpHeaders( { 'Content-Type': 'application/json' }),
      params: new HttpParams(),
      responseType: 'json',
      observe: 'response'
    };
    return options;
  }
}
