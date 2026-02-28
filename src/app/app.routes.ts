import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'anstallda',
		pathMatch: 'full'
	},
	{
	  path: 'anstallda',
	  loadComponent: () =>
	    import('./employees/employees-list/employees-list').then(m => m.EmployeesListComponent)
	},
	{
		path: 'anstallda/:id',
		loadComponent: () => 
			import('./employees/employee-detail/employee-detail').then(m => m.EmployeeDetailComponent)
	},
	{
		path: '**',
		redirectTo: 'anstallda'
	}
];
