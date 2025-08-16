import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrl: './choose-role.component.css'
})
export class ChooseRoleComponent {

  constructor(private router: Router) {
  }

  selectRole(role: string) {
    if (role === 'employee') {
      this.router.navigate(['/sign-up-employee']);
    }
    else if (role === 'admin') {
      this.router.navigate(['/sign-up-admin']);
    }
  }
}
