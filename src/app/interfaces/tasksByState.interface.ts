import { Task } from "./task.interface";

export interface TasksByState {
    toDo: Task[];
    done: Task[];
}