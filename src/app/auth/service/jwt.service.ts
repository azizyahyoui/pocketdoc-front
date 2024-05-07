import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeModule } from 'src/app/jwt-decode/jwt-decode.module'; 

import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { each } from 'chart.js/dist/helpers/helpers.core';

import * as CryptoJS from 'crypto-js';






// Utilisez jwtDecode au lieu de jwt_decode dans votre code



const BASE_URL = "http://localhost:8089/auth/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private role!: string;
  private user!: any;
  private userRole: string = '';
  private isAuthenticated: boolean = false;


  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService, @Inject('JWT_DECODE') private jwtDecode: any) { }
  token!: string | null;
  
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  
  decodeToken(token: string): any {
   return this.jwtDecode(token);
  }

 getToken(): string {
    const encryptedToken = this.cookieService.get('token');
   
        return this.decryptAES(encryptedToken);
  
}
  

  login(loginRequest: any): Observable<any> {
    this.getUserRole;
    return this.http.post<any>(BASE_URL + 'signin', loginRequest)
      .pipe(
        tap((response: any) => {
        }),
        catchError(error => {
          this.isAuthenticated = false;
          return throwError(error);
        })
      );
     
  }
  decodetoken() {
    this.token = this.cookieService.get('token');
    const decodedToken: any = this.decodeToken(this.token);
    const role = decodedToken.role;
    return role;
  }
  


  

  getUserRole(): string | null {
    this.token = this.getToken();
  
    // Vérifier si le token est vide ou non défini
    if (!this.token) {
      return null;
    }
  
    const decodedToken: any = this.decodeToken(this.token);
    const role = decodedToken.role;
    return role;
  }
  

getUserId(): number {
  this.token = this.getToken();
    const decodedToken: any = this.decodeToken(this.token);
    const userId = decodedToken.userId;
    return userId;
}



  public  isAuthenticated1(): boolean {
    return this.isAuthenticated;
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get(BASE_URL + 'users/' + userId, {
    });
  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}user/${email}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur par email:', error);
        return throwError(error);
      })
    );
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
  roleUser(userId: any, userData: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL}role/${userId}`, userData);
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
  
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  countVerifiedUsers(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'verified/count');
  }

  getAgePercentages(): Observable<number[]> {
    return this.http.get<number[]>(BASE_URL + 'age/percentage');
  }

  encryptAES(message: string): string {
    // Convertir la clé en une clé de 128 bits (16 caractères)
     const fixedKey = 'h1u7R3e2a9lS4e5c8r3e7t';

    // Chiffrer le message avec AES en mode CBC (Cipher Block Chaining)
    const encryptedMessage = CryptoJS.AES.encrypt(message, fixedKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Renvoyer le message chiffré en format Base64
    return encryptedMessage.toString();
}


decryptAES(ciphertext: string): string {
    // Convertir la clé en une clé de 128 bits (16 caractères)
    const fixedKey = 'h1u7R3e2a9lS4e5c8r3e7t';

    // Déchiffrer le message avec AES en mode CBC (Cipher Block Chaining)
    const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, fixedKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Renvoyer le message déchiffré en tant que chaîne de caractères
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}


}


