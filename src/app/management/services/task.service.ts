import { Injectable } from '@angular/core';
import { Task } from '../model/task.entity';
import { BaseService } from '../../../shared/services/base.service';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<Task> {
  constructor() {
    super();
    this.resourceEndpoint = '/taskk';
  }

  public getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getTasksByUserId(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.resourcePath()}/user/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
