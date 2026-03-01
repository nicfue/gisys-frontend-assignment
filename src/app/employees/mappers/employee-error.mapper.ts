import { HttpErrorResponse } from "@angular/common/http";
import { EmployeeError } from "../../shared/models/employee-error.model";
import { ApiErrorResponse } from "../../shared/api/models/api-error-response.model";

export function mapApiError(error: HttpErrorResponse): EmployeeError {
    const apiError = error.error as ApiErrorResponse;

    return {
        status: error.status,
        message: apiError.message ?? 'Något gick fel'
    }
}