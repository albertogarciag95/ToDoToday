import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Observable } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';

@Injectable({ providedIn: 'any' })

export class MapService {

  constructor(private httpService: HttpService) { }

  getOptimizedRoute(coordinates: any[]): Observable<any> {
    const URL = 'https://api.mapbox.com/directions/v5/mapbox/walking/' +
        coordinates.join(';') +
        '?access_token=' + mapboxgl.accessToken +
        '&annotations=distance,duration' +
        '&overview=full' +
        '&geometries=geojson';

    return this.httpService.getForeign(URL);
  }

  getGeocoding(coordinates: string[]): Observable<any> {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'+
      '/' + coordinates.join(',') + '.json' +
      '?access_token=' + mapboxgl.accessToken +
      '&routing=true' +
      '&autocomplete=true';

    return this.httpService.getForeign(URL);
  }


}
