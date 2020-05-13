import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })

export class MapService {

  constructor(private httpService: HttpService) { }

  getOptimizedRoute(coordinates, token): Observable<any> {
    const URL = 'https://api.mapbox.com/directions/v5/mapbox/walking/' +
        coordinates.join(';') +
        '?access_token=pk.eyJ1IjoiYWxiZXJ0b2dhcmNpYWciLCJhIjoiY2s5azlzajZ2MDV2czNqcWFyMjkwcDRwMyJ9._DaMFU4Mcn3CPBK_MKpszQ' +
        '&annotations=distance,duration' +
        '&overview=full' +
        '&geometries=geojson';

    return this.httpService.getForeign(URL);
  }


}
