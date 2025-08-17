import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './custom-notification.component.html',
  styleUrl: './custom-notification.component.css',
})
export class CustomNotificationComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: 'success' | 'error', title: string },
    private snackBarRef: MatSnackBarRef<CustomNotificationComponent>
  ) {}

  getIcon(): string {
    return this.data.type === 'success' ? 'check_circle' : 'error';
  }

  close(): void {
    this.snackBarRef.dismiss();
  }
}
