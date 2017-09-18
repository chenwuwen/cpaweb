import { TestBed, inject } from '@angular/core/testing';

import { MypaginationService } from './mypagination.service';

describe('MypaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MypaginationService]
    });
  });

  it('should be created', inject([MypaginationService], (service: MypaginationService) => {
    expect(service).toBeTruthy();
  }));
});
