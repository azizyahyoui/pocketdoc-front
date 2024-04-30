import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

const BASE_URL = "http://localhost:8089/auth/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private userRole!: string;
  private isAuthenticated: boolean = false;


  constructor(private http: HttpClient,private router: Router,) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  

  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'signin', loginRequest)
      .pipe(
        tap((response: any) => {
          // Après une connexion réussie, stockez les informations sur l'utilisateur
          localStorage.setItem('userRole', response.role);
          this.userRole = response.role;
          this.isAuthenticated = true;
        
        }),
        catchError(error => {
          this.isAuthenticated = false;
          return throwError(error);
        })
      );
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  public  isAuthenticated1(): boolean {
    return this.isAuthenticated;
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get(BASE_URL + 'users/' + userId, {
    });
  }


  forgotPassword(email: string): Observable<any> {
    return this.http.post(BASE_URL + 'forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(BASE_URL + 'reset-password', { token, newPassword });
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('token'); // Utilisez la même clé que dans votre composant login
    if (jwtToken) {
      //console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }
  uploadProfileImage(email: string, profileImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profileImage', profileImage);

    return this.http.post('http://localhost:8089/auth/profileimage', formData);
  }
  uploadProfileImage1(email: string, profileImage1: File): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profileImage1', profileImage1);

    return this.http.post('http://localhost:8089/auth/profileimage1', formData);
  }
  updateUser(userId: any, userData: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL}users/${userId}`, userData);
  }
  getUsers(): Observable<any> {
    return this.http.get(BASE_URL + 'users'
    );
  }
  deletuser(userId: any): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}users/${userId}`);
  }
  acceptUser(userId: any, newStatus: any): Observable<any> {
    // Passer le paramètre newStatus dans l'URL de la requête
    return this.http.put<any>(`${BASE_URL}${userId}/status?newStatus=${newStatus}`, {});
  }
  public logout(): void {
  
    console.log('Fonction logout() appelée');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userRole')
    this.router.navigate(['/login']);
  }
  countVerifiedUsers(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'verified/count');
  }

  getAgePercentages(): Observable<number[]> {
    return this.http.get<number[]>(BASE_URL + 'age/percentage');
  }

}
