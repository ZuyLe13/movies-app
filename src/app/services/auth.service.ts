import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/signup';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, signupData).pipe(
      tap(response => {
        if (response.token) {
          this.token = response.token;
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}