import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Password } from '../Models/Password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:5042/api/password';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Password[]> {
    return this.http.get<Password[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch password:', error);
        return throwError(() => new Error('Unable to load passwords.'));
      })
    );
  }
  add(password: Password): Observable<any> {
    return this.http.post(this.apiUrl, password).pipe(
      catchError((error) => {
        console.error('Failed to fetch password:', error);
        return throwError(() => new Error('Unable to load passwords.'));
      })
    );
  }
}
