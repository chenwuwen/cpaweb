import { TestBed, inject } from '@angular/core/testing';

import { LoginmodelService } from './loginmodel.service';

describe('LoginmodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginmodelService]
    });
  });

  it('should be created', inject([LoginmodelService], (service: LoginmodelService) => {
    expect(service).toBeTruthy();
  }));
});
