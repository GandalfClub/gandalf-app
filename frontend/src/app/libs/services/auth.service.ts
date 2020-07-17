import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface IAuthResponse {
  status: number;
  user: User;
  logged: boolean;
  message: string;
  isCompetitionActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'https://gandalf-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/auth/signup`;
    return this.http.post<IAuthResponse>(url, { email, password }, httpOptions);
  }

  logInByGithub(email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/auth/login`;
    return this.http.post<IAuthResponse>(url, { email, password }, httpOptions);
  }



}
