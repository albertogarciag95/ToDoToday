import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';

import { AppEndpoints } from '../../app-endpoints';

import { Category } from '../../shared/models/category';
import { HttpService } from '../../shared/services/http/http.service';
import { Place } from 'src/app/shared/models/place';


@Injectable({ providedIn: 'any' })
export class CreateItineraryService {

  constructor(private httpService: HttpService) { }

  getCategories(): Observable<Category[]> {
    let withCredentials = true;
    return this.httpService.get(AppEndpoints.CATEGORIES);
  }

  createItinerary(body: object): Observable<Place[]> {
    return this.httpService.post(AppEndpoints.ITINERARY, body);
  }

}
