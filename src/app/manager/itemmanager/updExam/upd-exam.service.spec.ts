import { TestBed, inject } from '@angular/core/testing';

import { UpdExamService } from './upd-exam.service';

describe('UpdExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdExamService]
    });
  });

  it('should be created', inject([UpdExamService], (service: UpdExamService) => {
    expect(service).toBeTruthy();
  }));
});
