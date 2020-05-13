import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })

export class MapService {

  constructor(private httpService: HttpService) { }

  getOptimizedRoute(coordinates, token): Observable<any> {
    const URL = 'https://api.mapbox.com/optimized-trips/v1/mapbox/walking/' +
        coordinates.join(';') +
        '?access_token=pk.eyJ1IjoiYWxiZXJ0b2dhcmNpYWciLCJhIjoiY2s5azlzajZ2MDV2czNqcWFyMjkwcDRwMyJ9._DaMFU4Mcn3CPBK_MKpszQ' +
        '&distributions=3,1;' +
        '&roundtrip=false' +
        '&annotations=distance' +
        '&overview=full' +
        '&destination=last' +
        '&steps=true' +
        '&geometries=geojson' +
        '&source=first';

    return this.httpService.getForeign(URL);
  }


}
