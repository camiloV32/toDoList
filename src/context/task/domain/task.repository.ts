import { Task, PrimitiveTask } from "./task.entity";

export abstract class TaskRepository{
    abstract create(task: Task): Promise<PrimitiveTask>;
}