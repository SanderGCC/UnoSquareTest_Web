import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskCardComponent } from "../../components/task-card/task-card.component";

@Component({
  selector: 'app-home',
  imports: [
    TaskCardComponent,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
