import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  url : string = 'http://localhost:8089/inscs/';

  constructor(private http: HttpClient) { }

  ajouterInscr(med:any):Observable<any>{
    return this.http.post(this.url,med).pipe(
      catchError(this.handleError)
    );
  }

  getAllInscriByUserID(id:any):Observable<any>{
    return this.http.get<any>(this.url+'users/events/'+id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
    
  }}
