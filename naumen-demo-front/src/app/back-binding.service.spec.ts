import { TestBed } from '@angular/core/testing';

import { BackBindingService } from './back-binding.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackBindingService', () => {
  let service: BackBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BackBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
