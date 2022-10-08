import { Component, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EmployeeEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements?: ElementRef[];
  pageTitle = 'Employee Edit';
  errorMessage?: string ;
  employeeForm?: FormGroup ;
  tranMode?: string ;
  employee?: Employee | any;
  private sub?: Subscription ;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {

    this.validationMessages = {
      name: {
        required: 'Employee name is required.',
        minlength: 'Employee name must be at least three characters.',
        maxlength: 'Employee name cannot exceed 50 characters.'
      },
      cityName: {
        required: 'Employee city name is required.',
      }
    };
  }

  ngOnInit() {
    this.tranMode = "new";
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
      ]],
      address: '',
      cityname: ['', [Validators.required]],
      gender: '',
      company: '',
      designation: '',
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const cityName = params.get('cityName');
        if (id == null || '0') {
          const employee: Employee = { id: "0", name: "", address: "", gender: "", company: "", designation: "", cityName: "" };
          this.displayEmployee(employee);
        }
        else {
          this.getEmployee(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getEmployee(id: string): void {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: Employee) => this.displayEmployee(employee),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayEmployee(employee: Employee): void {
    if (this.employeeForm) {
      this.employeeForm.reset();
    }
    this.employee = employee;
    if (this.employee.id == '0') {
      this.pageTitle = 'Add Employee';
    } else {
      this.pageTitle = `Edit Employee: ${this.employee.name}`;
    }
    this.employeeForm?.patchValue({
      name: this.employee.name,
      address: this.employee.address,
      gender: this.employee.gender,
      company: this.employee.company,
      designation: this.employee.designation,
      cityName: this.employee.cityName
    });
  }

  deleteEmployee(): void {
    if (this.employee?.id == '0') {
      this.onSaveComplete();
    } else {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure want to delete this Employee: ${this.employee?.name}?`)) {
        this.employeeService.deleteEmployee(this.employee.id)
          .subscribe(
            () => this.onSaveComplete(),
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveEmployee(): void {
    if (this.employeeForm?.valid) {
      if (this.employeeForm.dirty) {
        const p = { ...this.employee, ...this.employeeForm.value };
        if (p.id === '0') {
          this.employeeService.createEmployee(p)
            .subscribe(
              () => this.onSaveComplete(),
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.employeeService.updateEmployee(p)
            .subscribe(
              () => this.onSaveComplete(),
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.employeeForm?.reset();
    this.router.navigate(['/employees']);
  }
}
