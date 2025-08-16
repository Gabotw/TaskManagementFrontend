import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInUserRole: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  get currentUserRole() {
    return this.signedInUserRole.asObservable();
  }

  signUp(signUpRequest: SignUpRequest) {
    this.http
      .post<SignUpResponse>(
        `${this.basePath}/authentication/sign-up`,
        signUpRequest,
        this.httpOptions
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/sign-in']).then();
        },
        error: () => {
          this.router.navigate(['/sign-up']);
        },
      });
  }

  signIn(signInRequest: SignInRequest) {
    this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUsername.next(response.username);
          this.signedInUserRole.next(response.role);
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
          this.router.navigate(['/sign-in']).then();
        }
      });
  }

  signOut() {
    this.signedIn.next(false);
    this.signedInUsername.next('');
    this.signedInUserRole.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
