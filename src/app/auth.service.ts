// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private forgotPassword_apiUrl = 'https://localhost:44310/forgot-password';
  private resetPassword_apiUrl = 'https://localhost:44310/reset-password';
  private changepassword_apiUrl = 'https://localhost:44310/change-password'; 


  constructor(private http: HttpClient,private router: Router) {}

  // register(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }

  // login(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, data);
  // }

  // getRole(): string {
  //   const token = localStorage.getItem('token');
  //   if (!token) return '';
  //   const decoded: any = jwtDecode(token);
  //   return decoded['role'];
  // }

  // isAdmin(): boolean {
  //   return this.getRole() === 'Admin';
  // }

  // isEditor(): boolean {
  //   return this.getRole() === 'Editor';
  // }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.forgotPassword_apiUrl, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(this.resetPassword_apiUrl, {
      token,
      newPassword,
    });
  }

  getUserDetails(): { username: string; email: string; } {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      username: user.username || 'Guest',
      email: user.email || '',
    };
  }

  changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.changepassword_apiUrl, passwordData, { headers });
  }

   logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData'); 
    this.router.navigate(['/signin']);
  }

}
