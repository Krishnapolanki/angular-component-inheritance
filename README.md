Sometimes we might get a requirement like we need to create a component such that initially, we need to show few details, and then if the user is interested to read more then once the user clicks we might need to show complete details.

let's take an example, consider we need to show employee details with just name and role and we have a button to show more details about the employee. In this case in both the scenarios the data source will be the same, only the data representation is different. In this case, we can leverage the inheritance concept in angular without duplicating the code which is related to the pulling of data into those components.

## **Demo**

**Step1**:

Create a base employee component.

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/shared/api/employee';

@Component({
  selector: 'app-employee-base',
  template: ``,
  styleUrls: ['./employee-base.component.scss'],
})
export class EmployeeBaseComponent implements OnInit {
  @Input() employeeInfo: Employee;

  ngOnInit() {}

  constructor() {}
}
```

> Notice here that this `template` property is empty since we don't really use this component to render any data.

**Step2**:

Create a minified version of the employee details component to display minimum details like name and job role.

```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeBaseComponent } from '../employee-base/employee-base.component';

@Component({
  selector: 'app-employee-details-mini',
  templateUrl: './employee-details-mini.component.html',
  styleUrls: ['./employee-details-mini.component.scss'],
})
export class EmployeeDetailsMiniComponent extends EmployeeBaseComponent {
  constructor() {
    super();
  }
}
```

> There are two things to note here

1. We are extending the `EmployeeDetailsMiniComponent` from `EmployeeBaseComponent`
1. In the constructor, we are calling the `super()` which is required when we are inheriting from the base component

corresponding HTML code for this component will look like below

```html
<div>
  <span>
    First Name :
  </span>
  <span>{{ employeeInfo.firstName }}</span>
</div>
<div>
  <span>
    JobTitle :
  </span>
  <span>{{ employeeInfo.jobTitle }}</span>
</div>
```

So here we can see the property `employeeInfo` is not part of the `EmployeeDetailsMiniComponent` but it is part of the `EmployeeBaseComponent`. So we no need to write additional code to assign data this variable that is the responsibility of `EmployeeBaseComponent`, we can just use that property to render as per the child component scope. Here we are just using the `firstName` and `jobTitle` properties.

**Step3**:

Now let's create a details component where we will display all the employee details.

```typescript
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
  }

  ngOnInit() {
    this.dataSource.push(this.employeeInfo);
  }
}
```

The corresponding HTML code will look like below

```html
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let element">{{ element.id }}</td>
  </ng-container>

  <ng-container matColumnDef="firstName">
    <th mat-header-cell *matHeaderCellDef>FirstName</th>
    <td mat-cell *matCellDef="let element">{{ element.firstName }}</td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th mat-header-cell *matHeaderCellDef>LastName</th>
    <td mat-cell *matCellDef="let element">{{ element.lastName }}</td>
  </ng-container>

  <ng-container matColumnDef="jobTitle">
    <th mat-header-cell *matHeaderCellDef>JobTitle</th>
    <td mat-cell *matCellDef="let element">{{ element.jobTitle }}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>
```

Here we can notice that the data source is the same for both the mini and normal versions of the employee details component. The only thing is in the mini version we are just displaying less information, but in the normal component, we are displaying the complete details.

To make it compatible with `matTable` data source we are transforming accordingly, but the actual data source is still the same which is `employeeInfo` which is the property of `EmployeeBaseComponent`.

**Step4**:
Now let's see how we can consume these components. To do that we will create another component called employee list component where it will display all the employees and by default, it will display in minified version of employee details.

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeService } from 'src/app/shared/api/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeList = this.employeeService.getEmployees();
  }
}
```

Corresponding HTML code will look like below

```html
<mat-card class="example-card" *ngFor="let employee of employeeList">
  <mat-card-content>
    <app-employee-details-mini [employeeInfo]="employee" *ngIf="!employee.showFullInfo"></app-employee-details-mini>
    <app-employee-details [employeeInfo]="employee" *ngIf="employee.showFullInfo"></app-employee-details>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button (click)="employee.showFullInfo = !employee.showFullInfo">
      {{ employee.showFullInfo ? 'Show Less' : 'Show More' }}
    </button>
  </mat-card-actions>
</mat-card>
```

So here we can see two components `app-employee-details-mini` and `app-employee-details`. Initially, we will display a mini version of employee details and if the user is interested by clicking `Show More` button we will display the complete details. But the data source for both the components is the same.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/dtd20khx7ya0w7qwi4sz.PNG)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/lizelgi7vxxzuzatthuw.PNG)

Few things need to consider in Inheritance.

- Life Cycle hooks are not inherited from the base component. In order to call the base component life hooks, we need to call something like below

```typescript
  ngOnInit() {
    super.ngOnInit();
  }
```

- Properties and methods on base class will be inherited based on the access level. Meaning if the properties/methods are private the child components cannot be inherited
- MetaData and Decorator will not be inherited from the parent component to child components. However, there is an exception to `@Input()` and `@Output()` decorators which can be inherited into the child component.
- Dependency injection is tricky in Inheritance. If we might need to provide the reference of the instance from child component and the parent component must make the property as public in the constructor. Below is a simple example to give more ideas.

> Parent Component

```typescript
@Component({
  selector: 'app-employee-base',
  template: ``,
  styleUrls: ['./employee-base.component.scss'],
})
export class EmployeeBaseComponent {
  employeeInfo: Employee;
  constructor(public employeeService: EmployeeService) {
    this.employeeInfo = this.employeeService.getEmployees();
  }
}
```

> Child Component

```typescript
@Component({
  selector: 'app-employee-details-mini',
  templateUrl: './employee-details-mini.component.html',
  styleUrls: ['./employee-details-mini.component.scss'],
})
export class EmployeeDetailsMiniComponent extends EmployeeBaseComponent {
  constructor(public employeeService: EmployeeService) {
    super(employeeService);
  }
}
```
