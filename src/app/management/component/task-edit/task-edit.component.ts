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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.entity';
import { Task } from '../../model/task.entity';
import { TaskService } from '../../services/task.service';
import {LoaderService} from '../../../public/services/loader.service';
import {NotificationService} from '../../../public/services/notification.service';
import {DialogService} from '../../../public/services/dialog.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    NgFor
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  employees: User[] = [];
  task: Task;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskEditComponent>,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }
  ) {
    this.task = new Task(0, '', '', false, 0);
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCompleted: [false],
      assignedTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadTask();
  }

  loadEmployees(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.employees = users.filter(user => user.role === 'EMPLOYEE');
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
      }
    });
  }

  loadTask(): void {
    this.taskService.getById(this.data.taskId).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted,
          assignedTo: task.userId
        });
      },
      error: (err: Error) => {
        console.error('Error al cargar la tarea:', err);
      }
    });
  }

  onSubmit(): void {
    this.dialogService.confirm('Guardar cambios', '¿Estás seguro de guardar los cambios en esta tarea?').subscribe(result => {
      if (result) {
        this.loaderService.show();
        const updatedTask = {
          taskkId: this.task.taskkId,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          isCompleted: this.taskForm.value.isCompleted,
          userId: this.taskForm.value.assignedTo
        };

        this.taskService.update(updatedTask.taskkId, updatedTask).subscribe({
          next: () => {
            this.loaderService.hide();
            this.notificationService.success('Tarea actualizada correctamente');
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loaderService.hide();
            this.notificationService.error('Error al actualizar la tarea');
            console.error('Error al actualizar la tarea:', error);
          }
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
