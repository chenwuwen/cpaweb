import { TestBed, inject } from '@angular/core/testing';

import { ItemmanagerService } from './itemmanager.service';

describe('ItemmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemmanagerService]
    });
  });

  it('should be created', inject([ItemmanagerService], (service: ItemmanagerService) => {
    expect(service).toBeTruthy();
  }));
});
