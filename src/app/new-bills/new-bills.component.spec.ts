import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBillsComponent } from './new-bills.component';

describe('NewBillsComponent', () => {
  let component: NewBillsComponent;
  let fixture: ComponentFixture<NewBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
