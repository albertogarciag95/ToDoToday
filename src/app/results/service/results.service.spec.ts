import { TestBed, async } from '@angular/core/testing';

import { ResultsService } from './results.service';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';

describe('ResultsService', () => {
  let service: ResultsService;

  beforeEach(async(() => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['put']);
    httpServiceSpy.put.and.returnValue( of(null) );

    service = new ResultsService(httpServiceSpy);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
