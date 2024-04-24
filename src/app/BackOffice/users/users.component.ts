import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(
    private jwtService: JwtService,
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
    this.jwtService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  navigateToProfile(userId: string) {
    this.router.navigate(['admin/gestionprofile', userId]);
  }
}
