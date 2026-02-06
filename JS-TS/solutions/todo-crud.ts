import {Todo} from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  const result: Todo[] = state.slice(0);
  result.push(todo)
  return result
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const index: number = state.findIndex(todo => todo.id === id)
  if (state[index]) {
    const existingTodo = state[index];
    const updatedTodo = {
      ...existingTodo, ...update,
      id: existingTodo.id, createdAt: existingTodo.createdAt
    };
    const result: Todo[] = state.slice(0)
    result[index] = updatedTodo;
    return result;
  } else {
    throw new Error(`Can't update! Todo with id = ${id} non-existing`)

  }
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const index: number = state.findIndex(todo => todo.id === id)
  if (index === -1) {
    throw new Error(`Can't remove! Todo with id = ${id} non-existing`)
  } else {
    const result: Todo[] = state.slice(0)
    result.splice(index, 1);
    return result;
  }
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  const index: number = state.findIndex(todo => todo.id === id)
  if (index === -1) {
    return undefined
  } else {
    return state[index];
  }
}
