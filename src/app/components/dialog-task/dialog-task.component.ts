import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import { first, tap } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { TasksApiService } from '../../services/tasks-api.service';
import { TasksStore } from '../../store/tasks.store';
@Component({
  selector: 'app-dialog-task',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss'
})
export class DialogTaskComponent {

  public taskForm!: FormGroup;

  private readonly _tasksService = inject(TasksApiService)

  private readonly _formBuilder = inject(FormBuilder)

  private readonly _tasksStore = inject(TasksStore)

  private _dialogRef = inject(MatDialogRef<DialogTaskComponent>)

  ngOnInit(): void {
    this._initForms();
  }

  private _initForms(): void {
    this.taskForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      dueDate: [null],
      complete: [null]
    })
  }

  public addTask(): void {
    let task: Task = this.taskForm.getRawValue()
    this._tasksService.addTask(task)
      .pipe(
        first(),
        tap(() => this._tasksStore.loadTasks(null)))
      .subscribe(data => {
        if (!!data) this._dialogRef.close();
      })
  }
}
