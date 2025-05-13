import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './context/auth/infrastructure/auth.module';
import { TaskModule } from './context/task/infrastructure/task.module';

@Module({
  imports: [PrismaModule, AuthModule, TaskModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
