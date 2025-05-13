import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";

import { TASK_ROUTE } from "../route.constants";
import { CreateTaskUseCase } from "src/context/task/application/create-task-use-case/create-task.use-case";
import { CreateHttpTaskDto } from "./create-task.http-dto";
import { PrimitiveTask, StatusTaskType } from "src/context/task/domain/task.entity";
import { JwtAuthGuard } from "src/context/auth/infrastructure/guards/jwt-auth.guard";


@Controller(TASK_ROUTE)
export class createTaskController{
    constructor(private readonly createTaskUseCase: CreateTaskUseCase){}

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async run(
        @Body() createHttpTaskDto: CreateHttpTaskDto,
      ): Promise<{message: string, data: PrimitiveTask}> {
        const newTask = await this.createTaskUseCase.run({
            userId: createHttpTaskDto.userId,
            title: createHttpTaskDto.title,
            description: createHttpTaskDto.description,
            status: createHttpTaskDto.status,

        })
        return {
            message: "ok",
            data: newTask
        };
      }
}