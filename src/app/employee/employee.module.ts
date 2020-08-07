import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeContainerComponent } from './container/employee-container/employee-container.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeBaseComponent } from './components/employee-base/employee-base.component';
import { EmployeeDetailsMiniComponent } from './components/employee-details-mini/employee-details-mini.component';

@NgModule({
  declarations: [
    EmployeeContainerComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeBaseComponent,
    EmployeeDetailsMiniComponent,
  ],
  imports: [CommonModule, EmployeeRoutingModule, MatCardModule, MatButtonModule, MatTableModule, MatFormFieldModule],
})
export class EmployeeModule {}
