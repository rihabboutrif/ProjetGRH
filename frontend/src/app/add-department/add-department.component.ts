import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {


  //////
  departmentName: string = '';  // Department name
  newProfession: string = '';  // New profession to add
  professions: string[] = [];   // Array to hold added professions

  constructor(private userService: AuthentificationService,private router: Router){}

  // Method to add a profession
  addProfession(): void {
    if (this.newProfession.trim()) {
      this.professions.push(this.newProfession.trim());
      this.newProfession = '';  // Clear input field after adding profession
    } else {
      alert('Please enter a valid profession.');
    }
  }

  // Method to remove a profession
  removeProfession(index: number): void {
    this.professions.splice(index, 1);
  }

  // Submit the department form
  submitForm(): void {
    const departmentData = {
      departmentName: this.departmentName,
      professions: this.professions
    };
    
    this.userService.addDepartment(departmentData).subscribe(
      response => {
        console.log('Department added successfully!', response);
        // Optionally clear the form or show a success message
        alert('Department added successfully!');
        this.resetForm();
        this.router.navigate(['/dep-list']);

      },
      error => {
        console.error('Error adding department:', error);
      }
    );
  }
  resetForm() {
    this.departmentName = '';
    this.professions = [];
    this.newProfession = '';
  }
  /////////
}
