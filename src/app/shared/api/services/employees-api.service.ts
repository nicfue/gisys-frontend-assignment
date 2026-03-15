import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { EmployeeApiResponse, EmployeeDto, EmployeesApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  readonly httpClient = inject(HttpClient);

  private apiBaseUrl = 'https://dummy.restapiexample.com/api/v1';

  getEmployees$(): Observable<EmployeeDto[]> {
    return this.httpClient.get<EmployeesApiResponse>(`${this.apiBaseUrl}/employees`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching employees:', error);
        throw error;
      })
    );
  }

  getEmployee$(id: number): Observable<EmployeeDto> {
    return this.httpClient.get<EmployeeApiResponse>(`${this.apiBaseUrl}/employee/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.log('Error fetching employee:', error);
        throw error;
      })
    );
  }  
}