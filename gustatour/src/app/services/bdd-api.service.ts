import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BddApiService {
  apiUrl: string = "http://localhost:8080/"

  constructor(
    private http: HttpClient,
  ) { }

  public getCall(query: string): Observable<any> {
    return this.http.get(this.apiUrl + query);
  }
}
