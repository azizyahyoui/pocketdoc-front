import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { JwtService } from 'src/app/auth/service/jwt.service';
import Chart, { ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  totalUsers: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  @ViewChild('myChart1') myChart1!: ElementRef;
  chart1: any;
  user: any;
  selectedRole: string = 'USER';
  selectedUser: any;
  constructor(
    private jwtService: JwtService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.selectedRole = this.user.role;
  }

  ngAfterViewInit() {
    this.createChart();
    this.createChart1();
  }

  loadUsers() {
    this.jwtService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalUsers = this.users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
        this.updatePages();
        this.setPage(1);
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    );
  }

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalUsers);
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  navigateToProfile(userId: string) {
    this.router.navigate(['admin/gestionprofile', userId]);
  }



  createChart() {
    this.jwtService.countVerifiedUsers().subscribe(
      count => {
        const ctx = this.myChart.nativeElement.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Vérifié', 'Non vérifié'],
            datasets: [{
              data: [count*100,100-count*100 ], // Utilisation du nombre d'utilisateurs vérifiés pour le graphique
              backgroundColor: [
                '#36A2EB', // Couleur pour les utilisateurs vérifiés
                '#FF6384'  // Couleur pour les utilisateurs non vérifiés
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...(Chart as any).defaults.pie,
            width: 300,
            height: 300
          } as ChartOptions<'pie'>
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs vérifiés :', error);
      }
    );
  }

  deleteUser(userId: any) {
    this.jwtService.deletuser(userId).subscribe(
      (response) => {
        // Gérer la réponse de la requête de suppression ici, si nécessaire
        console.log('Utilisateur supprimé avec succès :', response);
        // Actualiser la liste des utilisateurs ou effectuer d'autres actions nécessaires
        this.loadUsers();
      },
      (error) => {
        // Gérer les erreurs de la requête de suppression ici, si nécessaire
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      }
    );
  }

 
  createChart1() {
    this.jwtService.getAgePercentages().subscribe(
      percentages => {
        if (!this.myChart1) {
          return;
        }
        const ctx = this.myChart1.nativeElement.getContext('2d');
    
        const ageGroups = ['Moins de 18 ans', '18-30 ans', 'Plus de 30 ans'];
    
        this.chart1 = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ageGroups,
            datasets: [{
              data: percentages,
              backgroundColor: [
                '#FF6384', // Couleur pour le groupe "Moins de 18 ans"
                '#36A2EB', // Couleur pour le groupe "18-30 ans"
                '#FFCE56'  // Couleur pour le groupe "Plus de 30 ans"
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...(Chart as any).defaults.pie,
            width: 300,
            height: 300
          } as ChartOptions<'pie'>
        });
      },
      error => {
        console.error('Erreur lors de la récupération des pourcentages d\'âge :', error);
      }
    );
  }
 
  changeUserRole(updatedRole: string) {
    this.jwtService.updateUser(this.user.id, { role: updatedRole }).subscribe(
      (response) => {
        // Handle the successful response of the user update request here, if needed
        console.log('User role updated successfully:', response);
        // Refresh the list of users or perform any other necessary actions
        this.loadUsers();
      },
      (error) => {
        // Handle errors of the user update request here, if needed
        console.error('Error updating user role:', error);
      }
    );
  }
  
  
}
