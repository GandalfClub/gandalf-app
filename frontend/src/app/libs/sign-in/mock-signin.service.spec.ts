import { TestBed } from '@angular/core/testing';

import { MockSigninService } from './mock-signin.service';

describe('MockSigninService', () => {
  let service: MockSigninService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSigninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
