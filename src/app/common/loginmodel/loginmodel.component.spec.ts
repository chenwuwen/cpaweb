import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmodelComponent } from './loginmodel.component';

describe('LoginmodelComponent', () => {
  let component: LoginmodelComponent;
  let fixture: ComponentFixture<LoginmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
