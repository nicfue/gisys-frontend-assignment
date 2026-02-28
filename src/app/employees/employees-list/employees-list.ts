import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { loadingState } from '../../shared/constants/loading-state.constant';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'gisys-employees-list',
  templateUrl: './employees-list.html',
  styleUrls: ['./employees-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink, 
    LoaderComponent, 
    ErrorComponent
  ],
})
export class EmployeesListComponent {
  private employeesService = inject(EmployeesService);

  loadingState = loadingState;

  loadingStateSignal = this.employeesService.getEmployeesLoadingState();
  employeesSignal = this.employeesService.getEmployeesSignal();
  error = this.employeesService.getEmployeesError();
}
