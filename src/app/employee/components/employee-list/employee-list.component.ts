import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/shared/api/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @Input() employeeList: Employee[];
  constructor() {}

  ngOnInit() {
    console.log(this.employeeList);
  }
}
