import { TestBed, inject } from '@angular/core/testing';

import { UnitexamService } from './unitexam.service';

describe('UnitexamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitexamService]
    });
  });

  it('should be created', inject([UnitexamService], (service: UnitexamService) => {
    expect(service).toBeTruthy();
  }));
});
