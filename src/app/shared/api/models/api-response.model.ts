import { EmployeeDto } from "./employee-dto.model";

export interface ApiResponse {
  status: string;
  data: EmployeeDto[];
  message?: string;
}
