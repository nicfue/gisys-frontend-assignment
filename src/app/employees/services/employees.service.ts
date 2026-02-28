import { inject, Injectable, signal } from '@angular/core';
import { take } from 'rxjs';
import { EmployeeDto } from '../../shared/api/models/employee-dto.model';
import { EmployeesApiService } from '../../shared/api/services/employees-api.service';
import { LoadingState, loadingState } from '../../shared/constants/loading-state.constant';
import { mapApiError } from '../../shared/mappers/employee-error.mapper';
import { EmployeeError } from '../../shared/models/employee-error.model';
import { Employee } from '../../shared/models/employee.model';

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

  constructor() {
    this._getEmployees();
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

  private _mapEmployeesDtoToEmployees(employeeDto: EmployeeDto[]): Employee[] {
    return employeeDto.map((employee) => ({
      id: employee.id,
      name: employee.employee_name,
      salary: employee.employee_salary,
      age: employee.employee_age,
      profileImage: employee.profile_image,
    }));
  }

  private _mapEmployeeDtoToEmployee(employeeDto: EmployeeDto): Employee {
    const { id, employee_name, employee_salary, employee_age, profile_image } = employeeDto;

    return {
      id,
      name: employee_name,
      salary: employee_salary,
      age: employee_age,
      profileImage: profile_image,
    };
  }
}
