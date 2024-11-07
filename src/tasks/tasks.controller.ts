import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
// import { Task } from './task-status.enum';
// import { GetTasksGetDto } from './dto/get-tasks-get.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksGetDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilter(filterDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }
  //
  // @Delete('/:id')
  // deleteAllTasks(@Param('id') id: string) {
  //   return this.taskService.deleteTaskById(id);
  // }
  //
  // @Patch('/:id/status')
  // updateTasStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ) {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskById(id, status);
  // }
  //
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
