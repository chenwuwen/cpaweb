import { TestBed, inject } from '@angular/core/testing';

import { SearchmodalService } from './searchmodal.service';

describe('SearchmodalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchmodalService]
    });
  });

  it('should be created', inject([SearchmodalService], (service: SearchmodalService) => {
    expect(service).toBeTruthy();
  }));
});
