import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { loadingState } from '../../shared/constants/loading-state.constant';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'gisys-employee-detail',
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink, 
    LoaderComponent,
    ErrorComponent
  ],
})
export class EmployeeDetailComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly employeesService = inject(EmployeesService);

  loadingState = loadingState;

  employeeSignal = this.employeesService.getEmployeeSignal();
  loadingStateSignal = this.employeesService.getEmployeeLoadingState();
  errorSignal = this.employeesService.getEmployeeError();

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.employeesService.getEmployee(id);
  }
}
