import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { first, tap } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { TasksApiService } from '../../services/tasks-api.service';
import { TasksStore } from '../../store/tasks.store';
@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) isDone!: boolean;

  private readonly _tasksService = inject(TasksApiService)

  private readonly _tasksStore = inject(TasksStore)


  public deleteTaskById(id: number): void {
    this._tasksService.deleteTaskById(id).pipe(
      first(),
      tap(() => this._tasksStore.loadTasks(null))
    ).subscribe()
  }

  public changeStateTask(task: Task): void {
    this._tasksService.changeStateTask(!this.isDone, { ...task }).pipe(
      first(),
      tap(() => this._tasksStore.loadTasks(null))
    ).subscribe()
  }

}
