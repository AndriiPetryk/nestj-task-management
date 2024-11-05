import { TaskStatus } from '../task.model';

export class GetTasksGetDto {
  status?: TaskStatus;
  search?: string;
}
