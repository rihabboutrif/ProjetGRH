import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService1: AuthentificationService,private router: Router,
    private cookieService: CookieService) {
     
  }
  isAdmin(): boolean {
    return this.authService1.isAdmin();
  }
  username: string = '';
  username1: string = '';

  role: string = '';

   // Logout function
  //  logout(): void {
  //   this.authService1.logout().subscribe(
  //     response => {
  //       console.log(response.message); // Handle successful logout response
  
  //       // Clear non-HttpOnly cookies
  //       this.cookieService.delete('username');
  //       this.cookieService.delete('role');
  
  //       // Redirect to login page
  //       this.router.navigate(['/login1']);
  //     },
  //     error => {
  //       console.error('Logout error:', error);
  //       alert('An error occurred while logging out. Please try again.');
  //     }
  //   );
  // }
  
  logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['/login1']);
  }
  ngOnInit(): void {
    this.username = this.authService1.getUsername();
    this.role=this.authService1.getUserRole();

  
  }

}
