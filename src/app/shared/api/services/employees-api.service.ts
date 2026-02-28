import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { EmployeeDto } from '../models/employee-dto.model';
import { employeesMock } from '../../../employees/employees-mock.ts/employees-mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  readonly httpClient = inject(HttpClient);

  private apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';

  getEmployees$(): Observable<EmployeeDto[]> {
    // return this.httpClient.get<ApiResponse>(this.apiUrl).pipe(
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error fetching employees:', error);
    //     throw error;
    //   })
    // )

    return of(employeesMock).pipe(
      map((response) => response.data),
    );
  }

  getEmployee$(id: number): Observable<EmployeeDto> {
    // return this.httpClient.get<EmployeeDto>(`${this.apiUrl}/${id}`).pipe(
    //   catchError((error) => {
    //     console.log('Error fetching employee:', error);
    //     throw error;
    //   }),
    // );

   return of({
      id: 1,
      employee_name: 'Tiger Nixon',
      employee_salary: '320800',
      employee_age: '61',
      profile_image: '',
    });
  }
}
