import {InMemoryRepository} from './repository';
import {Todo, NewTodo} from './types';
import {createTodo} from "./todo-factory";

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  private simulateNetworkLatency() {
    const delay = Math.floor(Math.random() * 301 + 300);
    return new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    })
  }

  async getAll(): Promise<Todo[]> {
    await this.simulateNetworkLatency()
    return this.repo.findAll()
  }

  async getTodoById(id: number): Promise<Todo | undefined> {
    await this.simulateNetworkLatency()
    return this.repo.findById(id)
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await this.simulateNetworkLatency()
    const todo = createTodo(newTodo)
    return this.repo.add(todo)
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await this.simulateNetworkLatency()
    return this.repo.update(id, update)
  }

  async remove(id: number): Promise<void> {
    await this.simulateNetworkLatency()
    return this.repo.remove(id)
  }
}
