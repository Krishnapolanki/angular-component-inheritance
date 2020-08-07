import { Component, OnInit } from '@angular/core';
import { EmployeeBaseComponent } from '../employee-base/employee-base.component';

@Component({
  selector: 'app-employee-details-mini',
  templateUrl: './employee-details-mini.component.html',
  styleUrls: ['./employee-details-mini.component.scss'],
})
export class EmployeeDetailsMiniComponent extends EmployeeBaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
