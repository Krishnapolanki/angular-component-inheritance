import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/shared/api/employee';

@Component({
  selector: 'app-employee-base',
  template: ``,
  styleUrls: ['./employee-base.component.scss'],
})
export class EmployeeBaseComponent implements OnInit {
  @Input() employeeInfo: Employee;
  ngOnInit() {
    console.log('Base Component');
  }
}
