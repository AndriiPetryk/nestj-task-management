import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTasksGetDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
