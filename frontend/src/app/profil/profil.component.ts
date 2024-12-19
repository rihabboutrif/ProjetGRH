import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  user:any={};
  userId: string='';
  token: string='';

  constructor(private UserService: AuthentificationService,private cookieService: CookieService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  
  fetchUsers(): void {
    this.token = this.cookieService.get('token');
    if (this.token) {
      const decodedToken: any = this.UserService.getUserIdFromToken(this.token);
      console.log('Decoded Token:', decodedToken);
      this.userId = decodedToken?.id || null; // Access 'id' from the decoded token
      this.UserService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des utilisateurs', error);
        }
      );
      console.log('User ID:', this.userId);
    }
  }
  
}
