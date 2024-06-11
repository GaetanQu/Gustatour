import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = "fakeToken";

  getToken(): string {
    return this.token;
  }
}
