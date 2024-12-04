import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrl: './list-department.component.css'
})
export class ListDepartmentComponent  implements OnInit{

  deps: any[] = [];

  constructor(private UserService: AuthentificationService) {}

  ngOnInit(): void {
    this.fetchDeps();
  }

  fetchDeps(): void {
    this.UserService.getDeps().subscribe(
      (data) => {
        this.deps = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des departments', error);
      }
    );
  }
  getDeps(): void {
    this.UserService.getDeps().subscribe((data: any[]) => {
      this.deps = data;
    });
  }
  onDeleteDep(depId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet départment ?')) {
      this.UserService.deleteDep(depId).subscribe(() => {
        alert('départment supprimé avec succès');
        this.getDeps(); // Mettre à jour la liste après la suppression
      }, (error: any) => {
        console.error('Erreur lors de la suppression de l\'départment', error);
        alert('Une erreur est survenue lors de la suppression.');
      });
    }
  }
  
}




