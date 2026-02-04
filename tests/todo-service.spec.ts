import {Todo} from "../JS-TS/solutions/types";
import {TodoApi} from "../JS-TS/solutions/todo-api";
import {TodoService} from "../JS-TS/solutions/todo-service";
import {TodoStatus} from "../JS-TS/solutions/types";


describe('TodoService', () => {
  let api: TodoApi;
  let service: TodoService;

  beforeEach(() => {
    jest.useFakeTimers();
    api = new TodoApi();
    service = new TodoService(api);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('successful creation of a todo', async () => {
    const createPromise = service.create('Test title', 'Test description');
    jest.advanceTimersByTime(600);
    let todo: Todo = await createPromise
    const id: number = todo.id

    const searchPromise = service.searchById(id);
    jest.advanceTimersByTime(600);
    todo = await searchPromise;

    expect(todo.title).toBe('Test title');
    expect(todo.description).toBe('Test description');
    expect(todo.status).toBe(TodoStatus.PENDING);
    expect(todo.id).toBeDefined();
    expect(todo.createdAt).toBeDefined();
  });

  it('toggling status', async () => {
    const createPromise = service.create('Toggle me');
    jest.advanceTimersByTime(600);
    const todo: Todo = await createPromise

    // First toggle: PENDING → IN_PROGRESS
    jest.useRealTimers();
    let updated: Todo = await service.toggleStatus(todo.id);
    expect(updated.status).toBe(TodoStatus.IN_PROGRESS);

    // Second toggle: IN_PROGRESS → COMPLETED
    updated = await service.toggleStatus(todo.id);
    expect(updated.status).toBe(TodoStatus.COMPLETED);

    // Third toggle: COMPLETED → IN_PROGRESS
    updated = await service.toggleStatus(todo.id);
    expect(updated.status).toBe(TodoStatus.IN_PROGRESS);
  });

  it('search returns matching items', async () => {
    service.create('Buy milk', 'Get dairy products');
    jest.advanceTimersByTime(600);

    service.create('Write code', 'Implement feature X');
    jest.advanceTimersByTime(600);

    const results1Promise = service.search('milk');
    jest.advanceTimersByTime(600);
    const results1: Todo[] = await results1Promise
    expect(results1).toHaveLength(1);
    expect(results1[0].title).toContain('milk');

    const results2Promise = service.search('feature');
    jest.advanceTimersByTime(600);
    const results2: Todo[] = await results2Promise
    expect(results2).toHaveLength(1);
    expect(results2[0].description).toContain('feature');

    const results3Promise = service.search('NONEXISTENT');
    jest.advanceTimersByTime(600);
    const results3: Todo[] = await results3Promise
    expect(results3).toHaveLength(0);
  });

  it('error is thrown when updating non-existing id', async () => {
    const createPromise = service.create('Test title', 'Test description');
    jest.advanceTimersByTime(600);
    const todo = await createPromise;

    expect(todo.title).toBe('Test title');
    expect(todo.description).toBe('Test description');
    expect(todo.status).toBe(TodoStatus.PENDING);
    expect(todo.id).toBeDefined();
    expect(todo.createdAt).toBeDefined();

    const id: number = todo.id
    service.delete(id);
    jest.advanceTimersByTime(600);

    jest.useRealTimers();
    await expect(service.toggleStatus(id))
      .rejects
      .toThrow(`Todo with id = '${id}' not found`);
  });

  it('error is thrown when removing non-existing id', async () => {
    const createPromise = service.create('Test title', 'Test description');
    jest.advanceTimersByTime(600);
    const todo = await createPromise;

    expect(todo.title).toBe('Test title');
    expect(todo.description).toBe('Test description');
    expect(todo.status).toBe(TodoStatus.PENDING);
    expect(todo.id).toBeDefined();
    expect(todo.createdAt).toBeDefined();

    const id: number = todo.id
    service.delete(id);
    jest.advanceTimersByTime(600);


    const deletedPromise = service.delete(id);
    jest.advanceTimersByTime(600);
    await expect(deletedPromise)
      .rejects
      .toThrow(`Todo with id = '${id}' not found`);
  });
});