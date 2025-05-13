import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { createTaskController } from "./http-api/create-task/create-task.controller";
import { InMemoryTaskRepository } from "./repositories/in-memory.task-repository";
import { TaskRepository } from "../domain/task.repository";
import { CreateTaskUseCase } from "../application/create-task-use-case/create-task.use-case";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtVerifyMiddleware } from "./middleware/jwt.middleware";
import { JwtModule } from "@nestjs/jwt";
import { SECRET } from "constants/jwt-key";


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: SECRET,
            signOptions: { expiresIn: '10m' },
        })
    ],
    controllers: [createTaskController],
    providers: [
        InMemoryTaskRepository,
        CreateTaskUseCase,
        PrismaService,
        {
            provide: TaskRepository,
            useExisting: InMemoryTaskRepository
        }
    ],
    exports: [CreateTaskUseCase]
})

export class TaskModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtVerifyMiddleware).forRoutes({ path: "/task", method: RequestMethod.POST })
    }
}