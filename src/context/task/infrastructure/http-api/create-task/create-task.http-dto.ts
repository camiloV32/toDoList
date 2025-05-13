import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusTaskType } from 'src/context/task/domain/task.entity';

export class CreateHttpTaskDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(StatusTaskType)
  status: StatusTaskType;
}
