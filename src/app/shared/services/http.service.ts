import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable()
export class HttpService {

  static API_END_POINT = environment.API;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;

  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(response): any {
    console.error(response);
  }

  private extractData(response): any {
    return response.body;
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
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

}
