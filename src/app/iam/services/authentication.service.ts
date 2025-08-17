import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { Router } from '@angular/router';
import { SignUpRequest } from '../model/sign-up.request';
import { SignUpResponse } from '../model/sign-up.response';
import { SignInRequest } from '../model/sign-in.request';
import { SignInResponse } from '../model/sign-in.response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInUserRole: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkTokenAndSetUser();
  }
  private checkTokenAndSetUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload = this.decodeToken(token);

        const userId = Number(tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);
        const username = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        this.signedIn.next(true);
        this.signedInUserId.next(userId);
        this.signedInUsername.next(username);
        this.signedInUserRole.next(role);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.signOut();
      }
    }
  }
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    return JSON.parse(decodedPayload);
  }
  get isSignedIn() {
    return this.signedIn.asObservable();
  }
  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  get currentUserRole() {
    return this.signedInUserRole.asObservable();
  }

  signUp(signUpRequest: SignUpRequest):Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
        `${this.basePath}/authentication/sign-up`,
        signUpRequest,
        this.httpOptions
      );
  }


  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .pipe(
        tap({
          next: (response) => {
            this.signedIn.next(true);
            this.signedInUsername.next(response.username);
            this.signedInUserRole.next(response.role);
            this.signedInUserId.next(response.id);
            localStorage.setItem('token', response.token);

            if (response.role === 'ADMIN') {
              this.router.navigate(['/home-admin']).then();
            } else if (response.role === 'EMPLOYEE') {
              this.router.navigate(['/home-employee']).then();
            }
          },
          error: () => {
            this.signedIn.next(false);
            this.signedInUsername.next('');
            this.signedInUserRole.next('');
            localStorage.removeItem('token');
          }
        })
      );
  }
  signOut() {
    this.signedIn.next(false);
    this.signedInUsername.next('');
    this.signedInUserRole.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
