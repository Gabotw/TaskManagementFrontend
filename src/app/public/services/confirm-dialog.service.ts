// src/app/shared/services/confirm-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) { }

  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }
}
