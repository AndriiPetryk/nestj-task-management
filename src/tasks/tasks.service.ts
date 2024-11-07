import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksGetDto } from './dto/get-tasks-get.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksGetDto } from './dto/get-tasks-get.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(filterDto: GetTasksGetDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
}
