import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'any' })
export class HttpService {

  static API_END_POINT = environment.API;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;

  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError((error: any) => of('ERROR: ', error))
      );
  }

  getForeign(endpoint: string): Observable<any> {
    return this.http.get(endpoint, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError((error: any) => of('ERROR: ', error))
      );
  }

  post(endpoint: string, body?: object) {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions())
      .pipe(
        map((response: any) => response.body),
        catchError((error: any) => of('ERROR: ', error))
      );
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,

      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders( { 'Content-Type': 'application/json' });
    this.params = new HttpParams();
    this.responseType = 'json';
  }

}
