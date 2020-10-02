import { TestBed } from '@angular/core/testing';

import { ContainerFacadeService } from './container.facade';

describe('ContainerFacadeService', () => {
  let service: ContainerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
