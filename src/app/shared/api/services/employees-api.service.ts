import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
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
    //   delay(2000),
    //   tap(data => console.log(data)
    //   ),
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error fetching employees:', error);
    //     throw error;
    //   }),
    // );

    return of(employeesMock).pipe(
      delay(2000),
      map((response) => response.data),
    );
  }
}
