import {TodoApi} from './todo-api';
import {Todo, TodoStatus} from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) {
  }

  async create(title: string, description = ''): Promise<Todo> {
    return await this.api.add({title, description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todo = await this.searchById(id);
    return todo.status === TodoStatus.COMPLETED
      ? await this.api.update(id, {status: TodoStatus.IN_PROGRESS})
      : await this.api.update(id, {status: TodoStatus.COMPLETED});

  }

  async delete(id: number): Promise<void> {
    await this.api.remove(id)
  }

  async searchById(id: number): Promise<Todo> {
    const todo: Todo = await this.api.getTodoById(id);
    if (!todo) {
      throw new Error(`Todo with id = '${id}' not found`);
    }
    return todo
  }

  async search(keyword: string): Promise<Todo[]> {
    const arrayOfTodo = await this.api.getAll();
    return arrayOfTodo.filter((todo) => {
      return todo.title.toLowerCase().includes(keyword.toLowerCase())
        || todo.description.toLowerCase().includes(keyword.toLowerCase());
    });
  }
}