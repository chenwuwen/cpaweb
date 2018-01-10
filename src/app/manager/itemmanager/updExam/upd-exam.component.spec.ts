import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdExamComponent } from './upd-exam.component';

describe('UpdExamComponent', () => {
  let component: UpdExamComponent;
  let fixture: ComponentFixture<UpdExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
