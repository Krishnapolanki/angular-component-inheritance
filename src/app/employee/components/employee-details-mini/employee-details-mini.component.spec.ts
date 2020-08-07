import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsMiniComponent } from './employee-details-mini.component';

describe('EmployeeDetailsMiniComponent', () => {
  let component: EmployeeDetailsMiniComponent;
  let fixture: ComponentFixture<EmployeeDetailsMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
