import { PrismaService } from "src/prisma/prisma.service";
import { TaskRepository } from "../../domain/task.repository";
import { PrimitiveTask, Task, StatusTaskType } from "../../domain/task.entity";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { connect } from "http2";


@Injectable()
export class InMemoryTaskRepository extends TaskRepository {
    constructor(private prisma: PrismaService) {
        super();
    }

    async create(task: Task): Promise<PrimitiveTask> {
        try {
            const { userId, title, description, status = StatusTaskType.pending } = task.toPrimitives();

            const newTask = await this.prisma.task.create({
                data: { userId, title, description, status }
            })

            return {
                taskId: newTask.taskId,
                userId,
                title,
                description,
                status
            };
            
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


}