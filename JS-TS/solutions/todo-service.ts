import {TodoApi} from './todo-api';
import {Todo, TodoStatus} from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) {
  }

  async create(title: string, description = ''): Promise<Todo> {
    return await this.api.add({title, description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    const all: Todo[] = await this.api.getAll();
    const todo = all.find(todo => {
      return todo.id === id
    })
    return todo.status === TodoStatus.COMPLETED
      ? await this.api.update(id, {status: TodoStatus.IN_PROGRESS})
      : await this.api.update(id, {status: TodoStatus.COMPLETED});

  }

  async search(keyword: string): Promise<Todo[]> {
    const arrayOfTodo = await this.api.getAll();
    return arrayOfTodo.filter((todo) => {
      return todo.title.toLowerCase().includes(keyword.toLowerCase())
        || todo.description.toLowerCase().includes(keyword.toLowerCase());
    });
  }
}
