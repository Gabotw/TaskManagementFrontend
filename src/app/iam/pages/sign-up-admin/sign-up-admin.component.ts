import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpRequest } from '../../model/sign-up.request';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './sign-up-admin.component.css'
})
export class SignUpAdminComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router, private authService: AuthenticationService) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  signUp() {
    const signUpRequest = new SignUpRequest(
      this.username,
      this.password,
      ['ADMIN'],
    );
    this.authService.signUp(signUpRequest);
  }
}
