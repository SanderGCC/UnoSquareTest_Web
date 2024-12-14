import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';
import { TaskCardComponent } from "../../components/task-card/task-card.component";
import { TasksStore } from '../../store/tasks.store';
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

  public tasksStore = inject(TasksStore)

  private readonly _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.tasksStore.loadTasks(null)
  }

  public addTask(): void {
    this._dialog.open(DialogTaskComponent);
  }

}
