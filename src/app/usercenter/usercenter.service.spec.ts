import { TestBed, inject } from '@angular/core/testing';

import { UsercenterService } from './usercenter.service';

describe('UsercenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercenterService]
    });
  });

  it('should be created', inject([UsercenterService], (service: UsercenterService) => {
    expect(service).toBeTruthy();
  }));
});
