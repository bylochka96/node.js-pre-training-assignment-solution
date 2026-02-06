import {TodoService} from './todo-service';
import {TodoApi} from './todo-api';
import {Todo, TodoStatus} from './types';

export class ToDoManager {
  private service = new TodoService(new TodoApi());

  async init(): Promise<void> {
    const data = {
      title: 'Demo title',
      description: 'Demo description'
    };
    await this.service.create(data.title, data.description);
  }

  async add(title: string, description = ''): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    let todo: Todo = await this.service.searchById(id);
    while (todo.status !== TodoStatus.COMPLETED) {
      await this.service.toggleStatus(id)
      todo = await this.service.searchById(id)
    }
  }

  async list(): Promise<Todo[]> {
    return await this.service.search('');
  }
}