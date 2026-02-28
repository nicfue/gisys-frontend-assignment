import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gisys-employee-detail',
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailComponent {}
