import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({ providedIn: 'any' })
export class ResultsService {

  constructor(private httpService: HttpService) { }

  startItinerary(itinerary) {
    return this.httpService.put(AppEndpoints.ITINERARY, itinerary);
  }

}
