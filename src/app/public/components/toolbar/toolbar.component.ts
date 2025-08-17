import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { MatDialog } from "@angular/material/dialog";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
    MatButton,
    MatIcon,
    MatToolbar
  ],
  styleUrls: ['./toolbar.component.css'],
  standalone: true
})
export class ToolbarComponent implements OnInit {
  userRole: string = '';
  userId: number = 0;
  username: string = '';

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.authService.currentUserRole.subscribe((role) => {
      const match = role.match(/name=(\w+)/);
      this.userRole = match ? match[1] : '';
    });

    this.authService.currentUsername.subscribe(username => {
      if (username) {
        this.username = username;
      }
    });
  }

  logout(): void {
    this.dialogService.confirm(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar la sesión?'
    ).subscribe(result => {
      if (result) {
        this.authService.signOut();
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
