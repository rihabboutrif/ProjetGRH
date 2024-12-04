import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  updateForm: FormGroup;
  depId: string = '';
  professions: string[] = []; // Array for professions
  newProfession: string = ''; // Holds input for new profession
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form with FormBuilder
    this.updateForm = this.fb.group({
      departmentName: ['', [Validators.required]] // Single string field for department name
    });
  }

  ngOnInit(): void {
    // Get department ID from the route
    this.depId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Dep ID: ' + this.depId);

    if (this.depId) {
      // Fetch department details
      this.userService.getDepById(this.depId).subscribe(
        (dep) => {
          this.updateForm.patchValue({
            departmentName: dep.departmentName
          });
          this.professions = dep.professions || []; // Populate professions array
        },
        (error) => {
          console.error('Error fetching department details', error);
        }
      );
    }
  }

  // Add profession to the list
  addProfession(): void {
    if (this.newProfession && this.newProfession.trim()) {
      this.professions.push(this.newProfession.trim());
      this.newProfession = ''; // Reset input
    } else {
      console.error('New profession is empty.');
    }
  }

  // Remove profession from the list
  removeProfession(index: number): void {
    this.professions.splice(index, 1);
  }

  // Submit the form
  onsubmit(): void {
    console.log('Submitting form:', this.updateForm.value);

    if (this.updateForm.valid) {
      const updateData = {
        ...this.updateForm.value,
        professions: this.professions // Include updated professions
      };

      this.loading = true;
      this.userService.updateDep(this.depId, updateData).subscribe(
        () => {
          this.loading = false;
          alert('Department updated successfully!');
          this.router.navigate(['/test']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Error updating department';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
