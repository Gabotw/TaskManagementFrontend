import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SignInRequest } from '../../model/sign-in.request';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SignInResponse} from '../../model/sign-in.response';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../../public/services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService, private notificationService: NotificationService) {
    this.authService.signOut();
  }

  signIn() {
    this.errorMessage = '';
    this.isLoading = true;

    const signInRequest = new SignInRequest(this.username, this.password);

    this.authService.signIn(signInRequest).subscribe({
      next: (response: SignInResponse) => {
        this.isLoading = false;
        this.notificationService.success('¡Inicio de sesión exitoso!');
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.notificationService.error('Esta cuenta no existe o la contraseña es incorrecta');
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
