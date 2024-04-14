import { TestBed } from '@angular/core/testing';

import { ProyectServiceService } from './proyect-service.service';

describe('ProyectServiceService', () => {
  let service: ProyectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
