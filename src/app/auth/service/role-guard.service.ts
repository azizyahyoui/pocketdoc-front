import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: JwtService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
    const expectedRoles = route.data['expectedRoles'];
    const userRole = localStorage.getItem('userRole'); // Récupérer le rôle depuis le stockage local
  
    // Vérifier si l'utilisateur possède l'un des rôles attendus
    if (expectedRoles.includes(userRole)) {
      return true; // Autoriser l'accès à la route
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return false; // Empêcher l'accès à la route
    }
  }
}
