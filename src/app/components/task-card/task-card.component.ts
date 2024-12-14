import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { first, tap } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { TasksApiService } from '../../services/tasks-api.service';
import { TasksStore } from '../../store/tasks.store';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
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

  private readonly _dialog = inject(MatDialog);

  public deleteTaskById(): void {
    this._tasksService.deleteTaskById(this.task.id!).pipe(
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

  public updateTask(): void {
    this._dialog.open(DialogTaskComponent, {
      data: { ...this.task }
    });

  }


}
