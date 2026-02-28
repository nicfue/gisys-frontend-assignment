import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { loadingState } from '../../shared/constants/loading-state.constant';

@Component({
  selector: 'gisys-employees-list',
  templateUrl: './employees-list.html',
  styleUrls: ['./employees-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  private employeesService = inject(EmployeesService);

  loadingState = loadingState;

  employeesLoadingState = this.employeesService.getEmployeesLoadingStateSignal();
  employeesSignal = this.employeesService.getEmployeesSignal();
  error = this.employeesService.getEmployeesErrorSignal();
}
