import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail';
import { EmployeesService } from '../services/employees.service';
import { LoadingState, loadingState } from '../../shared/constants/loading-state.constant';
import { Employee } from '../models/employee.model';
import { EmployeeError } from '../../shared/models/employee-error.model';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;
  let employeeSignal: WritableSignal<Employee | null>;
  let loadingStateSignal: WritableSignal<LoadingState>;
  let errorSignal: WritableSignal<EmployeeError | null>;
  let mockEmployeesService: jasmine.SpyObj<EmployeesService>;

  const mockActivatedRoute = {
    snapshot: { params: { id: 42 } },
  };

  beforeEach(async () => {
    employeeSignal = signal<Employee | null>(null);
    loadingStateSignal = signal<LoadingState>(loadingState.INITIAL);
    errorSignal = signal<EmployeeError | null>(null);

    mockEmployeesService = jasmine.createSpyObj('EmployeesService', [
      'getEmployee',
      'getEmployeeSignal',
      'getEmployeeLoadingState',
      'getEmployeeError',
    ]);
    mockEmployeesService.getEmployeeSignal.and.returnValue(employeeSignal.asReadonly());
    mockEmployeesService.getEmployeeLoadingState.and.returnValue(loadingStateSignal.asReadonly());
    mockEmployeesService.getEmployeeError.and.returnValue(errorSignal.asReadonly());

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailComponent],
      providers: [
        provideRouter([]),
        { provide: EmployeesService, useValue: mockEmployeesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployee with the id from route params on init', () => {
    expect(mockEmployeesService.getEmployee).toHaveBeenCalledWith(42);
  });

  it('should render a back navigation link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent?.trim()).toBe('Tillbaka');
  });

  it('should show loader when in loading state', () => {
    loadingStateSignal.set(loadingState.LOADING);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('gisys-loader')).toBeTruthy();
  });

  it('should display employee details when in success state', () => {
    employeeSignal.set({ id: 42, name: 'John Doe', salary: 50000, age: 30 });
    loadingStateSignal.set(loadingState.SUCCESS);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('42');
    expect(compiled.textContent).toContain('50000');
    expect(compiled.textContent).toContain('30');
  });

  it('should show error component when in error state', () => {
    errorSignal.set({ status: 404, message: 'Not Found' });
    loadingStateSignal.set(loadingState.ERROR);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('gisys-error')).toBeTruthy();
  });
});
