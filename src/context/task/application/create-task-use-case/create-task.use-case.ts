import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
import { TaskRepository } from "../../domain/task.repository";
import { PrimitiveTask, Task } from "../../domain/task.entity";


@Injectable()
export class CreateTaskUseCase{
    constructor(private readonly taskRepository: TaskRepository){}

    async run(createTaskDto: CreateTaskDto): Promise<PrimitiveTask> {
        const task = Task.create(createTaskDto);

        await this.taskRepository.create(task);

        return task.toPrimitives();
        
    }
}