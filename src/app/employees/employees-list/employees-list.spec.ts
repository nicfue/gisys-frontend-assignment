import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritableSignal, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EmployeesListComponent } from './employees-list';
import { EmployeesService } from '../services/employees.service';
import { LoadingState, loadingState } from '../../shared/constants/loading-state.constant';
import { Employee } from '../models/employee.model';
import { EmployeeError } from '../../shared/models/employee-error.model';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let employeesSignal: WritableSignal<Employee[]>;
  let loadingStateSignal: WritableSignal<LoadingState>;
  let errorSignal: WritableSignal<EmployeeError | null>;
  let mockEmployeesService: jasmine.SpyObj<EmployeesService>;

  beforeEach(async () => {
    employeesSignal = signal<Employee[]>([]);
    loadingStateSignal = signal<LoadingState>(loadingState.INITIAL);
    errorSignal = signal<EmployeeError | null>(null);

    mockEmployeesService = jasmine.createSpyObj('EmployeesService', [
      'loadEmployees',
      'getEmployeesSignal',
      'getEmployeesLoadingState',
      'getEmployeesError',
    ]);
    mockEmployeesService.getEmployeesSignal.and.returnValue(employeesSignal.asReadonly());
    mockEmployeesService.getEmployeesLoadingState.and.returnValue(loadingStateSignal.asReadonly());
    mockEmployeesService.getEmployeesError.and.returnValue(errorSignal.asReadonly());

    await TestBed.configureTestingModule({
      imports: [EmployeesListComponent],
      providers: [
        provideRouter([]),
        { provide: EmployeesService, useValue: mockEmployeesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadEmployees on creation', () => {
    expect(mockEmployeesService.loadEmployees).toHaveBeenCalled();
  });

  it('should render the page heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Anställda');
  });

  it('should show loader when in loading state', () => {
    loadingStateSignal.set(loadingState.LOADING);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('gisys-loader')).toBeTruthy();
  });

  it('should show employee cards when in success state', () => {
    employeesSignal.set([
      { id: 1, name: 'John Doe', salary: 50000, age: 30 },
      { id: 2, name: 'Jane Smith', salary: 60000, age: 25 },
    ]);
    loadingStateSignal.set(loadingState.SUCCESS);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Jane Smith');
    expect(compiled.querySelectorAll('a').length).toBe(2);
  });

  it('should display employee salary and age', () => {
    employeesSignal.set([{ id: 1, name: 'Alice', salary: 75000, age: 28 }]);
    loadingStateSignal.set(loadingState.SUCCESS);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('75000');
    expect(compiled.textContent).toContain('28');
  });

  it('should show error component when in error state', () => {
    errorSignal.set({ status: 500, message: 'Server Error' });
    loadingStateSignal.set(loadingState.ERROR);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('gisys-error')).toBeTruthy();
  });
});
