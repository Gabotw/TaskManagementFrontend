import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.entity';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {LoaderService} from '../../../public/services/loader.service';

@Component({
  selector: 'app-task-list-employee',
  templateUrl: './task-list-employee.component.html',
  styleUrls: ['./task-list-employee.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    MatFormField,
    MatInput,
    MatButton,
    MatIconButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    RouterLink,
    MatSort
  ]
})
export class TaskListEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['taskkId', 'title', 'description', 'isCompleted'];
  columnFilters: { [key: string]: string } = {};
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentUserId: number = 0;
  private userIdSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private authService: AuthenticationService,
    private loaderService: LoaderService,
  ) {}


  ngOnInit(): void {
    this.loaderService.show();
    this.userIdSubscription = this.authService.currentUserId.subscribe(userId => {
      this.currentUserId = userId;
      if (userId > 0) {
        setTimeout(() => {
          this.loadUserTasks();
        }, 500);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

        if (column === 'isCompleted') {
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
  loadUserTasks(): void {
    this.taskService.getTasksByUserId(this.currentUserId).subscribe({
      next: (tasks) => {
        this.dataSource.data = tasks;
        this.loaderService.hide();
      },
      error: (err) => {
        console.error('Error cargando tareas del usuario',err);
        this.loaderService.hide();
      }
    });
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
    switch(column) {
      case 'taskkId': return task.taskkId;
      case 'title': return task.title;
      case 'description': return task.description;
      case 'isCompleted': return task.isCompleted;
      default: return '';
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
