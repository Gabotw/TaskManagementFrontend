import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.entity';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogContent,
    MatDialogTitle,
    MatCheckboxModule,
    NgIf,
    NgFor
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  employees: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignedTo: ['', Validators.required],
      isCompleted: [false],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    console.log('Cargando empleados...');
    this.userService.getAll().subscribe({
      next: (users) => {
        console.log('Usuarios recibidos:', users);
        this.employees = users.filter(user => user.role === 'EMPLOYEE');
        console.log('Empleados filtrados:', this.employees);
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
