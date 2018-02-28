import { TestBed, inject } from '@angular/core/testing';

import { LoginmodalService } from './loginmodal.service';

describe('LoginmodalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginmodalService]
    });
  });

  it('should be created', inject([LoginmodalService], (service: LoginmodalService) => {
    expect(service).toBeTruthy();
  }));
});
