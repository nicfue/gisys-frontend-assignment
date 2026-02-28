import { inject, Injectable, signal } from '@angular/core';
import { EmployeesApiService } from '../../shared/api/services/employees-api.service';
import { map, Observable } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeDto } from '../../shared/api/models/employee-dto.model';
import { LoadingState } from '../../shared/models/loading-state.model';
import { loadingState } from '../../shared/constants/loading-state.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeesApiService = inject(EmployeesApiService);

  private _employeesSignal = signal<Employee[]>([]);
  private _employeesLoadingStateSignal = signal<LoadingState>(loadingState.INITIAL);

  private getEmployees$(): Observable<Employee[]> {
    return this.employeesApiService
      .getEmployees$()
      .pipe(map((empoyees) => this._mapEmployeeDtoToEmployees(empoyees)));
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
