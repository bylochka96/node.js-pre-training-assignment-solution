export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    const index: number = this.items.findIndex(todo => todo.id === id);
    if (index === -1) {
      throw new TodoNotFoundError(id)
    } else {
      const updatedTodo = {
        ...this.items[index], ...patch,
        id
      } as T;
      this.items[index] = updatedTodo;
      return updatedTodo;
    }
  }

  remove(id: number): void {
    const index: number = this.items.findIndex(todo => todo.id === id)
    if (index === -1) {
      throw new TodoNotFoundError(id)
    } else {

      this.items.splice(index, 1);
    }
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return this.items
  }
}

class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with id = '${id}' not found`);
    this.name = 'TodoNotFoundError';
  }
}