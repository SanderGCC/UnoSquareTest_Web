import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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

  ngOnInit(): void {
    this.tasksStore.loadTasks(null)
  }

}
