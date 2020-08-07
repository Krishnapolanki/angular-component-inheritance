import { Component, OnInit } from '@angular/core';
import { EmployeeBaseComponent } from '../employee-base/employee-base.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent extends EmployeeBaseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'jobTitle'];
  dataSource: any[] = [];
  constructor() {
    super();
    console.log('EmployeeDetailsComponent constructor');
  }

  ngOnInit() {
    this.dataSource.push(this.employeeInfo);
    super.ngOnInit();
    console.log('EmployeeDetailsComponent');
  }
}
