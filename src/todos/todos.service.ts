import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(newTodo);
  }

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const user = this.todosRepository.findOne(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    var todo = await this.todosRepository.findOne(id);
    todo = { ...todo, ...updateTodoDto };
    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
