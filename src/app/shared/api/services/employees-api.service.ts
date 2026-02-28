import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { EmployeeDto } from '../models/employee-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  readonly httpClient = inject(HttpClient);

  private apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';

  getEmployees$(): Observable<EmployeeDto[]> {
    return this.httpClient.get<ApiResponse<EmployeeDto[]>>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching employees:', error);
        throw error;
      }),
    );
  }
}
