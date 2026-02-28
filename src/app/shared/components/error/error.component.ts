import { Component, input } from '@angular/core';
import { EmployeeError } from '../../models/employee-error.model';

@Component({
  selector: 'gisys-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  error = input<EmployeeError | null>(null);
}
