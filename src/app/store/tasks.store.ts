import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { TasksByState } from '../interfaces/tasksByState.interface';
import { TasksApiService } from '../services/tasks-api.service';

interface TasksState {
  tasks: Task[]
  tasksByState: TasksByState
}

export const TasksInitialState: TasksState = {
  tasks: [],
  tasksByState: { done: [], toDo: [] }
}

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(TasksInitialState),
  withComputed(({ tasks, tasksByState }) => ({
    tasksComputed: computed(() => tasks()),
    taskToDo: computed(() => tasks().filter(task => !task?.complete)),
    taskToDoCount: computed(() => tasks().filter(task => !task?.complete).length),
    taskDone: computed(() => tasks().filter(task => !!task?.complete)),
    taskDoneCount: computed(() => tasks().filter(task => !!task?.complete).length),

  })),
  withMethods((store: any, taskApiService = inject(TasksApiService)) => ({
    loadTasks: rxMethod<any>(
      pipe(
        switchMap(() => {
          return taskApiService.getTasks().pipe(
            tap((tasks) => {
              patchState(store, { tasks })
            })
          )
        })
      )
    )
  }))
)