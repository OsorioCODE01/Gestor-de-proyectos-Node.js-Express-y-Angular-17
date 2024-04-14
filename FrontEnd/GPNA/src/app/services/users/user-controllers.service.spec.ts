import { TestBed } from '@angular/core/testing';

import { UserControllersService } from './user-controllers.service';

describe('UserControllersService', () => {
  let service: UserControllersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserControllersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
