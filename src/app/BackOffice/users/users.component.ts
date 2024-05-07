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
  paginatedUsers: any;
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
  selectedRole: string = '';
  selectedUser: any;
  searchText:any;
  searchStatus:any;
  sortColumn: string = 'id'; // Colonne par défaut pour le tri
  sortOrder: string = 'asc'; // Ordre de tri par défaut
  
  constructor(
    private jwtService: JwtService,
    private router: Router 
  ) { this.searchText = ''; // Initialiser searchText à une chaîne vide
  this.searchStatus = '';
   // Initialiser searchStatus à une chaîne vide
}

ngOnInit() {
  this.loadUsers();
  // Vérifier si user est défini avant d'essayer d'accéder à sa propriété role
  
  if (this.user && this.user.role) {
    this.selectedRole = this.user.role;
}
}

  ngAfterViewInit() {
    this.createChart();
    this.createChart1();
  }

  search() {
    const searchText = this.searchText.toLowerCase().trim();
    if (!searchText && !this.searchStatus) {
      // Reset to show all users if no search text and no search status
      this.paginatedUsers = this.users;
      this.paginateUsers(this.paginatedUsers);
      return;
    }
    
    // Filter users based on search text
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) 
    );
  
    // Store filtered users for pagination
    this.paginatedUsers = filteredUsers;
    this.paginateUsers(this.paginatedUsers);
  }
  
  
  paginateUsers(users: any[]) {
    this.totalUsers = users.length;
    this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
    this.updatePages();
  
    // Paginate the users
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalUsers);
    this.paginatedUsers = users.slice(startIndex, endIndex);
  }
  
  

  
  
  

  loadUsers() {
    this.jwtService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
  
        // Filtrer les utilisateurs en fonction du statut sélectionné
        if (this.searchStatus === 'active') {
          this.users = this.users.filter(user => user.status);
        } else if (this.searchStatus === 'inactive') {
          this.users = this.users.filter(user => !user.status);
        }
        
        // Mettre à jour le nombre total d'utilisateurs et les pages paginées
        this.totalUsers = this.users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
        this.updatePages();
        this.setPage(1); // Définir la page sur 1 après le chargement des utilisateurs
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    );
  }

  sortData(attribute: string) {
    if (this.sortColumn === attribute) {
      // Si la colonne est déjà triée, changer l'ordre du tri
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      // Si la colonne est différente, trier par ordre croissant
      this.sortColumn = attribute;
      this.sortOrder = 'asc';
    }
  
    // Utiliser la méthode sort() pour trier les données
    this.users.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
  
      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    // Mettre à jour les utilisateurs paginés après le tri
    this.updatePaginatedUsers();
  }
  



  refreshTable() {
    // Appelez la méthode de chargement des utilisateurs pour mettre à jour les données du tableau
    this.loadUsers();
}
changeRole(userId: string, newRole: string) {
  // Appel au service pour mettre à jour le rôle de l'utilisateur dans la base de données
  this.jwtService.updateUser(userId, newRole).subscribe(
    (response) => {
        // Gérer la réponse si nécessaire
        console.log('Rôle utilisateur mis à jour avec succès :', response);
        // Actualiser la liste des utilisateurs après la mise à jour du rôle
        this.loadUsers(); // Assurez-vous d'avoir une méthode loadUsers() pour recharger la liste des utilisateurs
    },
    (error) => {
        // Gérer les erreurs ici si nécessaire
        console.error('Erreur lors de la mise à jour du rôle utilisateur :', error);
    }
  );
}
roleOptions = [
  { value: 'USER', label: 'USER' },
  { value: 'ADMIN', label: 'ADMIN' },
  {  value: 'DOCTOR', label: 'DOCTOR' }
  // Ajoutez d'autres options de rôle au besoin
];

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
    this.updatePaginatedUsers(); // Mettre à jour les utilisateurs paginés à chaque changement de page
  }
  
  updatePaginatedUsers() {
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
 

  changeUserRole(userId: string, newRole: string) {
    // Créer un objet contenant le nouveau rôle
    const userData = { role: newRole };

    // Appeler la fonction updateUser avec l'ID de l'utilisateur et les données mises à jour
    this.jwtService.roleUser(userId, userData).subscribe(
        (response) => {
            // Gérer la réponse si nécessaire
            console.log('Rôle utilisateur mis à jour avec succès :', response);
            // Actualiser la liste des utilisateurs après la mise à jour du rôle
            this.loadUsers(); // Assurez-vous d'avoir une méthode loadUsers() pour recharger la liste des utilisateurs
        },
        (error) => {
            // Gérer les erreurs ici si nécessaire
            console.error('Erreur lors de la mise à jour du rôle utilisateur :', error);
        }
    );
}
  
}
