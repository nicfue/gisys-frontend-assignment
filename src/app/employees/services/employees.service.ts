import { inject, Injectable, signal } from '@angular/core';
import { take } from 'rxjs';
import { EmployeeDto } from '../../shared/api/models/employee-dto.model';
import { EmployeesApiService } from '../../shared/api/services/employees-api.service';
import { LoadingState, loadingState } from '../../shared/constants/loading-state.constant';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeesApiService = inject(EmployeesApiService);

  private _employeesSignal = signal<Employee[]>([]);
  private _employeesLoadingStateSignal = signal<LoadingState>(loadingState.INITIAL);
  private _employeesErrorSignal = signal<null>(null);

  constructor() {
      this._getEmployees();
  }

  getEmployeesSignal() {
    return this._employeesSignal.asReadonly();
  }

  getEmployeesLoadingStateSignal() {
    return this._employeesLoadingStateSignal.asReadonly();
  }

  getEmployeesErrorSignal() {
    return this._employeesErrorSignal.asReadonly();
  }

  private _getEmployees() {
    this._employeesLoadingStateSignal.set(loadingState.LOADING);

    return this.employeesApiService
      .getEmployees$()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
            this._employeesSignal.set(this._mapEmployeeDtoToEmployees(response));
            this._employeesLoadingStateSignal.set(loadingState.SUCCESS);
        },
        error: (error) => {
            this._employeesErrorSignal.set(error);
          this._employeesLoadingStateSignal.set(loadingState.ERROR);
        },
      });
  }

  private _mapEmployeeDtoToEmployees(employeeDto: EmployeeDto[]): Employee[] {
    return employeeDto.map((employee) => ({
      id: employee.id,
      name: employee.employee_name,
      salary: employee.employee_salary,
      age: employee.employee_age,
      profileImage: employee.profile_image,
    }));
  }
}
