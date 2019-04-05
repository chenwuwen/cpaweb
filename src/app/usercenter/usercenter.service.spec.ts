import { TestBed, inject } from '@angular/core/testing';

import { UserCenterService } from './usercenter.service';

describe('UserCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCenterService]
    });
  });

  it('should be created', inject([UserCenterService], (service: UserCenterService) => {
    expect(service).toBeTruthy();
  }));
});
