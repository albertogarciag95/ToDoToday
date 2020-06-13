import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ErrorDialog } from '../dialogs/error-dialog/error-dialog';
import { MatDialog } from '@angular/material/dialog';


@Injectable({ providedIn: 'any' })
export class HttpService {

  static API_END_POINT = environment.API;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint)
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  getForeign(endpoint: string): Observable<any> {
    return this.http.get(endpoint)
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
