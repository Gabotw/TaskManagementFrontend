import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {LoaderComponent} from '../public/components/loader/loader.component';
import {ConfirmDialogComponent} from '../public/components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    LoaderComponent,
    ConfirmDialogComponent
  ],
  exports: [
    LoaderComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
