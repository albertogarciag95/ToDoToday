import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { InfoDialog } from '../../dialogs/info-dialog/info-dialog';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class HttpService {

  static API_END_POINT = environment.API;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError(this._handleError.bind(this))
      );
  }

  getForeign(endpoint: string): Observable<any> {
    let options = this.createOptions();
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

  private _handleError(error: HttpErrorResponse) {
    console.error('ERROR: ', error);
    this.dialog.open(InfoDialog, { width: '650px', data: error });
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
