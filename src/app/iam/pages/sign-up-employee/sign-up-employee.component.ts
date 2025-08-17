import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {FormsModule} from '@angular/forms';
import {NotificationService} from '../../../public/services/notification.service';

@Component({
  selector: 'app-sign-up-employee',
  templateUrl: './sign-up-employee.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './sign-up-employee.component.css'
})
export class SignUpEmployeeComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router, private authService: AuthenticationService, private notificationService: NotificationService) {
    this.authService.signOut();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  signUp() {
    if (this.username && this.password) {
      const signUpRequest = new SignUpRequest(
        this.username,
        this.password,
        ['EMPLOYEE'],
      );
      this.authService.signUp(signUpRequest);
      this.notificationService.success('Tu cuenta como empleado ha sido creada exitosamente. Ahora puedes iniciar sesión.');
    }
  }
}
