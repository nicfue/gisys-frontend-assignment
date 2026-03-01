import { inject, Injectable, signal } from '@angular/core';
import { take } from 'rxjs';
import { EmployeeDto } from '../../shared/api/models/employee-dto.model';
import { EmployeesApiService } from '../../shared/api/services/employees-api.service';
import { LoadingState, loadingState } from '../../shared/constants/loading-state.constant';
import { mapApiError } from '../mappers/employee-error.mapper';
import { EmployeeError } from '../../shared/models/employee-error.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeesApiService = inject(EmployeesApiService);

  private _employeesSignal = signal<Employee[]>([]);
  private _employeeSignal = signal<Employee | null>(null);
  private _employeesLoadingState = signal<LoadingState>(loadingState.INITIAL);
  private _employeeLoadingState = signal<LoadingState>(loadingState.INITIAL);
  private _employeesError = signal<EmployeeError | null>(null);
  private _employeeError = signal<EmployeeError | null>(null);

  loadEmployees() {
    return this._getEmployees();
  }

  getEmployeesSignal() {
    return this._employeesSignal.asReadonly();
  }

  getEmployeeSignal() {
    return this._employeeSignal.asReadonly();
  }

  getEmployeesLoadingState() {
    return this._employeesLoadingState.asReadonly();
  }

  getEmployeeLoadingState() {
    return this._employeeLoadingState.asReadonly();
  }

  getEmployeesError() {
    return this._employeesError.asReadonly();
  }

  getEmployeeError() {
    return this._employeeError.asReadonly();
  }


  private _getEmployees() {
    this._employeesError.set(null);
    this._employeesLoadingState.set(loadingState.LOADING);

    return this.employeesApiService
      .getEmployees$()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this._employeesSignal.set(this._mapEmployeesDtoToEmployees(response));
          this._employeesLoadingState.set(loadingState.SUCCESS);
        },
        error: (error) => {
          const apiError = mapApiError(error);
          this._employeesError.set(apiError);
          this._employeesLoadingState.set(loadingState.ERROR);
        },
      });
  }

  getEmployee(id: number) {
    this._employeeError.set(null);
    this._employeeLoadingState.set(loadingState.LOADING);

    return this.employeesApiService
      .getEmployee$(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this._employeeSignal.set(this._mapEmployeeDtoToEmployee(response));
          this._employeeLoadingState.set(loadingState.SUCCESS);
        },
        error: (error) => {
          const apiError = mapApiError(error);
          this._employeeError.set(apiError);
          this._employeeLoadingState.set(loadingState.ERROR);
        },
      });
  }

  private _mapEmployeeDtoToEmployee(employeeDto: EmployeeDto): Employee {
    return {
      id: employeeDto.id,
      name: employeeDto.employee_name,
      salary: employeeDto.employee_salary,
      age: employeeDto.employee_age,
      profileImage: employeeDto.profile_image,
    };
  }
  
  private _mapEmployeesDtoToEmployees(employeeDtos: EmployeeDto[]): Employee[] {
    return employeeDtos.map((employee) => this._mapEmployeeDtoToEmployee(employee))
  }
}
