import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AppEndpoints } from '../../app/app-endpoints';

import { Category } from '../shared/models/category';
import { HttpService } from '../shared/services/http.service';

@Injectable({
  providedIn: 'root',
})

export class CreateItineraryService {

  constructor(private httpService: HttpService) { }

  getCategories(): Observable<Category[]> {
    return this.httpService.get(AppEndpoints.CATEGORIES);
  }

}
