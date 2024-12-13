import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../interfaces/task.interface';
import { TasksByState } from '../interfaces/tasksByState.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  private readonly _baseApi = environment.api

  private readonly _http = inject(HttpClient)

  constructor() { }

  public getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this._baseApi}tasks`)
  }

  public getTasksByState(): Observable<TasksByState> {
    return this.getTasks()
      .pipe(
        map(tasks => {
          return {
            toDo: tasks.filter(task => !task?.complete),
            done: tasks.filter(task => !!task?.complete)
          }
        })
      )
  }

  public deleteTaskById(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseApi}tasks/${id}`)
  }

  public changeStateTask(isComplete: boolean, task: Task): Observable<Task> {
    task.complete = isComplete
    return this.updateTaskById(task)
  }

  public updateTaskById(task: Task): Observable<Task> {
    return this._http.put<Task>(`${this._baseApi}tasks/${task.id}`, task)
  }
}


