import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { first } from 'rxjs';
import { TaskCardComponent } from "../../components/task-card/task-card.component";
import { Task } from '../../interfaces/task.interface';
import { TasksApiService } from '../../services/tasks-api.service';
@Component({
  selector: 'app-home',
  imports: [
    TaskCardComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public tasksDone: Task[] = []

  public tasksToDo: Task[] = []

  private readonly _tasksService = inject(TasksApiService)

  ngOnInit(): void {
    this._getTasks();
  }

  private _getTasks(): void {
    this._tasksService.getTasksByState()
      .pipe(
        first()
      ).subscribe(({ toDo, done }) => this._setTasksByState(toDo, done))
  }

  private _setTasksByState(todo: Task[], done: Task[]): void {
    this.tasksToDo = [...todo]
    this.tasksDone = [...done]
  }

}
