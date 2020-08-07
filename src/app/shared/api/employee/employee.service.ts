import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.class';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Employee[] {
    // return this.httpClient.get<Employee[]>(``);
    return this.mockEmployees();
  }

  mockEmployees(): Employee[] {
    const employees: Employee[] = [];
    for (let i = 0; i < 10; i++) {
      employees.push({
        id: i + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: faker.name.jobTitle(),
        showFullInfo: false,
      });
    }
    return employees;
  }
}
