import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../model/task.entity';
import { User } from '../../model/user.entity';
import {MatDialog} from '@angular/material/dialog';
import {TaskCreateComponent} from '../task-create/task-create.component';
import {TaskEditComponent} from '../task-edit/task-edit.component';
import {LoaderService} from '../../../public/services/loader.service';
import {NotificationService} from '../../../public/services/notification.service';
import {ConfirmDialogService} from '../../../public/services/confirm-dialog.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list-admin.component.html',
  styleUrls: ['./task-list-admin.component.css']
})
export class TaskListAdminComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['taskkId', 'title', 'description', 'userId', 'isCompleted', 'actions'];
  users: User[] = [];
  columnFilters: { [key: string]: string } = {};
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialogService:ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loadAllUsers();
      this.loadAllTasks();
    }, 500);
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.dataSource.data = [...this.dataSource.data].sort((a, b) => {
      const valueA = this.getPropertyValue(a, column);
      const valueB = this.getPropertyValue(b, column);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return this.sortDirection === 'asc'
        ? (valueA < valueB ? -1 : 1)
        : (valueA > valueB ? -1 : 1);
    });
  }

  private getPropertyValue(task: Task, column: string): any {
    if (column === 'userId') {
      return this.getUserName(task.userId);
    }

    switch(column) {
      case 'taskkId': return task.taskkId;
      case 'title': return task.title;
      case 'description': return task.description;
      case 'isCompleted': return task.isCompleted;
      case 'userId': return task.userId;
      default: return '';
    }
  }

  filterByTaskType(type: 'all' | 'pending' | 'completed'): void {
    delete this.columnFilters['isCompleted'];

    if (type === 'pending') {
      this.columnFilters['isCompleted'] = 'false';
    } else if (type === 'completed') {
      this.columnFilters['isCompleted'] = 'true';
    }

    this.applyFilters();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilters(): void {
    if (Object.keys(this.columnFilters).length === 0) {
      this.dataSource.filter = '';
      return;
    }

    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      let match = true;

      Object.keys(this.columnFilters).forEach(column => {
        const filterValue = this.columnFilters[column];

        if (!filterValue) return;

        if (column === 'userId') {
          const userName = this.getUserName(data.userId).toLowerCase();
          match = match && userName.includes(filterValue.toLowerCase());
        } else if (column === 'isCompleted') {
          if (filterValue !== '') {
            const boolFilterValue = filterValue === 'true';
            match = match && data.isCompleted === boolFilterValue;
          }
        } else {
          let cellValue = '';
          switch(column) {
            case 'taskkId': cellValue = data.taskkId?.toString().toLowerCase() || ''; break;
            case 'title': cellValue = data.title?.toLowerCase() || ''; break;
            case 'description': cellValue = data.description?.toLowerCase() || ''; break;
            default: cellValue = '';
          }
          match = match && cellValue.includes(filterValue.toLowerCase());
        }
      });

      return match;
    };

    this.dataSource.filter = '1';
  }
  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.show();
        const newTask = {
          taskkId: 0,
          title: result.title,
          description: result.description,
          isCompleted: false,
          userId: result.assignedTo
        };

        this.taskService.create(newTask).subscribe({
          next: (createdTask) => {
            this.loaderService.hide();
            this.notificationService.success('Tarea creada correctamente');
            this.loadAllTasks();
          },
          error: (error) => {
            this.loaderService.hide();
            this.notificationService.error('Error al crear la tarea');
            console.error('Error al crear la tarea', error);
          }
        });
      }
    });
  }

  deleteTask(taskId: number): void {
    this.dialogService.confirm('Eliminar tarea', '¿Estás seguro que deseas eliminar esta Tarea?').subscribe(result => {
      if (result) {
        this.loaderService.show();
        this.taskService.delete(taskId).subscribe({
          next: () => {
            this.loaderService.hide();
            this.notificationService.success('Tarea eliminada correctamente');
            this.loadAllTasks();
          },
          error: (err: Error) => {
            this.loaderService.hide();
            this.notificationService.error('Error al eliminar la tarea');
            console.error('Error al eliminar la tarea:', err);
          }
        });
      }
    });
  }
  openEditDialog(taskId: number): void {
    this.loaderService.show();
    const dialogRef = this.dialog.open(TaskEditComponent, {
      width: '600px',
      data: { taskId: taskId }
    });

    this.loaderService.hide();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.success('Tarea actualizada correctamente');
        this.loadAllTasks();
      }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAllTasks(): void {
    this.loaderService.show();
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.dataSource.data = tasks;
        this.loaderService.hide();
      },
      error: (err) => {
        console.error('Error cargando todas las tareas', err);
        this.notificationService.error('Error cargando las tareas');
        this.loaderService.hide();
      }
    });
  }

  loadAllUsers(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => console.error('Error cargando todos los usuarios', err)
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : `Usuario #${userId}`;
  }

  applyFilter(event: Event): void {
    this.loaderService.show();
    setTimeout(()=>{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loaderService.hide();
  },300);
  }

  get totalTasks(): number {
    return this.dataSource.data.length;
  }

  get pendingTasks(): number {
    return this.dataSource.data.filter(task => !task.isCompleted).length;
  }

  get completedTasks(): number {
    return this.dataSource.data.filter(task => task.isCompleted).length;
  }

}
