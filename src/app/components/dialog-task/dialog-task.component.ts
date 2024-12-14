import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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

  public isAdd: boolean = true

  private readonly _tasksService = inject(TasksApiService)

  private readonly _formBuilder = inject(FormBuilder)

  private readonly _tasksStore = inject(TasksStore)

  private readonly _dialogRef = inject(MatDialogRef<DialogTaskComponent>)



  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) { }

  ngOnInit(): void {
    this._initForms();
    if (!!this.data) {
      this.isAdd = false
      this.taskForm.patchValue(this.data)
    }
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

  public updateTask(): void {
    let task: Task = this.taskForm.getRawValue()
    task.id = this.data.id
    this._tasksService.updateTaskById(task)
      .pipe(
        first(),
        tap(() => this._tasksStore.loadTasks(null)))
      .subscribe(data => {
        if (!!data) this._dialogRef.close();
      })

  }
}
