import { TestBed } from '@angular/core/testing';

import { BackBindingService } from './back-binding.service';

describe('BackBindingService', () => {
  let service: BackBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
