import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomNotificationComponent } from '../components/custom-notification/custom-notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 4000): void {
    this.showCustomNotification(message, 'success', 'Éxito', duration);
  }

  error(message: string, duration: number = 5000): void {
    this.showCustomNotification(message, 'error', 'Error', duration);
  }

  private showCustomNotification(
    message: string,
    type: 'success' | 'error',
    title: string,
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { message, type, title }
    };

    this.snackBar.openFromComponent(CustomNotificationComponent, config);
  }
}
