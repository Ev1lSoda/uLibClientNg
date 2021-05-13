import { TestBed } from '@angular/core/testing';

import { MyapiserviceService } from './myapiservice.service';

describe('MyapiserviceService', () => {
  let service: MyapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
