import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BddApiService {
  //URL de l'API
  private apiUrl = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  //Récupère toutes les colonnes d'une table
  public getCall(query: string): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + query);
  }

  //Envoie une requête à l'API pour mettre à jour une donnée
  public putSend(query: string, body: any): Observable<void> {
    return this.http.put<void>(this.apiUrl + query, body);
  }
}