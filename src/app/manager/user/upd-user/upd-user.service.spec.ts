import { TestBed, inject } from '@angular/core/testing';

import { UdpUserService } from './upd-user.service';

describe('UdpUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UdpUserService]
    });
  });

  it('should be created', inject([UdpUserService], (service: UdpUserService) => {
    expect(service).toBeTruthy();
  }));
});
