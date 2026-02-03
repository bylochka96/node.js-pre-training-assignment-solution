import {Todo, TodoStatus} from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
    return state.map((item: Todo): Todo => {
        let result = structuredClone(item);
        if (completed && result.status !== TodoStatus.COMPLETED) {
            result.status = TodoStatus.COMPLETED;
        }
        return result
    })
}

export function clearCompleted(state: Todo[]): Todo[] {
    return state.filter((todo: Todo) => {
        return todo.status !== TodoStatus.COMPLETED;
    })
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
    return state.reduce((acc: number, todo: Todo) => {
        return todo.status === status ? ++acc : acc
    }, 0)
}
