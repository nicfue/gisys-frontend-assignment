export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface EmployeeDto {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

export type EmployeesApiResponse = ApiResponse<EmployeeDto[]>;
export type EmployeeApiResponse = ApiResponse<EmployeeDto>;

export interface ApiErrorResponse {
  message: string;
}
