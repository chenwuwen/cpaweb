import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmanagerComponent } from './add-exam.component';

describe('ItemmanagerComponent', () => {
  let component: ItemmanagerComponent;
  let fixture: ComponentFixture<ItemmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
