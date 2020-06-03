import { async } from '@angular/core/testing';

import { MapService } from './map.service';
import { of } from 'rxjs';

describe('MapService', () => {
  let service: MapService;
  const response: any = null;
  const fakeCoordinates: any[] = [[-3.70351, 40.416988], [-3.69346, 40.411128]];

  beforeEach(async(() => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['getForeign']);
    httpServiceSpy.getForeign.and.returnValue( of(response) );

    service = new MapService(httpServiceSpy);
  }));

  it('getOptimizedRoute', (done: DoneFn) => {
    service.getOptimizedRoute(fakeCoordinates).subscribe(value => {
      expect(value).toBe(response);
      done();
    });
  });

  it('getceoCoding', (done: DoneFn) => {
    service.getGeocoding(fakeCoordinates).subscribe(value => {
      expect(value).toBe(response);
      done();
    });
  });
});
