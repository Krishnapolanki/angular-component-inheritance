import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/shared/api/employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.scss'],
})
export class EmployeeContainerComponent implements OnInit {
  employeeList$: Employee[];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeList$ = this.employeeService.getEmployees();
  }
}
