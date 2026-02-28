import { HttpErrorResponse } from "@angular/common/http";
import { ApiErrorResponse } from "../api/models/api-response.model";
import { EmployeeError } from "../models/employee-error.model";

export function mapApiError(error: HttpErrorResponse): EmployeeError {
    const apiError = error.error as ApiErrorResponse;

    return {
        status: error.status,
        message: apiError.message ?? 'Något gick fel'
    }
}