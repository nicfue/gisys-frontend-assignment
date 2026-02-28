import { Component, inject, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'gisys-employees-list',
  imports: [],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.scss',
})
export class EmployeesList implements OnInit {
  private employeesService = inject(EmployeesService);
}
