import { StatusTaskType } from "../../domain/task.entity";

export interface CreateTaskDto{
    userId: string;
    title: string;
    description?: string;
    status: StatusTaskType;
}