import { Routes } from '@angular/router';

export const routes: Routes = [
	{
	  path: '',
	  loadComponent: () =>
	    import('./employees/employees-list/employees-list').then(m => m.EmployeesListComponent)
	},
	{
		path: 'employees/:id',
		loadComponent: () => 
			import('./employees/employee-detail/employee-detail').then(m => m.EmployeeDetailComponent)
	},
	{
		path: '**',
		redirectTo: ''
	}
];
