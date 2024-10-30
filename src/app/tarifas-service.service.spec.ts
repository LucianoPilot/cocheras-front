import { TestBed } from '@angular/core/testing';

import { TarifasServiceService } from './tarifas-service.service';

describe('TarifasServiceService', () => {
  let service: TarifasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
