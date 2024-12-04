import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Department {
  _id: string;
  departmentName: string;
  professions: string[];
}

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  //updateForm: FormGroup;
  userId: string = '';
  //departments: Department[] = [];
  //availableProfessions: string[] = [];
  errorMessage: string = '';
  //loading: boolean = false;
  updateForm = this.fb.group({
    name: [''],
    department: [''],
    profession: [''],
    salary: ['']
  });
  departments: any[] = [];
  availableProfessions: string[] = [];
  currentDepartmentName: string = '';
  loading = false;

  
  constructor(
    private route: ActivatedRoute,
    private userService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      profession: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  

  loadEmployeeData() {
    // Fetch employee data by ID (example API call)
    this.userService.getUserById(this.userId).subscribe((employee) => {
      this.updateForm.patchValue(employee);
      this.currentDepartmentName = this.getDepartmentNameById(employee.department);
    });
  }

  /*loadDepartments() {
    this.employeeService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }*/

  getDepartmentNameById(departmentId: string): string {
    const department = this.departments.find((d) => d._id === departmentId);
    return department ? department.departmentName : 'Unknown';
  }

 

  
  
  ngOnInit(): void {
   // this.loadDepartments();
    this.loadEmployeeData();
    // Fetch departments first
    this.userService.getDeps().subscribe(
      (data: Department[]) => {
        this.departments = data;
  
        // Fetch employee data if employee ID is available
        this.userId = this.route.snapshot.paramMap.get('id') || '';
        if (this.userId) {
          this.userService.getUserById(this.userId).subscribe(
            (user) => {
              // Set employee data to the form
              this.updateForm.patchValue({
                name: user.name,
                profession: user.profession,
                department: user.department._id, // Pre-select the department by ID
                salary: user.salary,
              });
  
              // Preload professions for the selected department
              const selectedDepartment = this.departments.find(
                (dept) => dept._id === user.department._id
              );
              if (selectedDepartment) {
                this.availableProfessions = selectedDepartment.professions;
                // Pre-select the profession based on the employee's data
                this.updateForm.patchValue({ profession: user.profession });
              }
            },
            (error) => {
              console.error('Error fetching employee data', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }
  
  
  // Handle department change
  onDepartmentChange(): void {
    
    const selectedDepartmentId = this.updateForm.get('department')?.value;
    const selectedDepartment = this.departments.find(
      (dept) => dept._id === selectedDepartmentId
    );
    
    // Update available professions based on the selected department
    this.availableProfessions = selectedDepartment
      ? selectedDepartment.professions
      : [];
  
    // Reset the profession field when department changes
    this.updateForm.patchValue({ profession: '' });
  }
  
  

  onsubmit(): void {
    if (this.updateForm.valid) {
      this.loading = true;
      this.userService.updateUser(this.userId, this.updateForm.value).subscribe(
        () => {
          this.loading = false;
          alert('Employee updated successfully');
          this.router.navigate(['/test']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Error updating employee';
          console.error(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
