import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = "http://localhost:8089/auth/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor(private http: HttpClient) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signin', loginRequest)
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

  

}
