#!/usr/bin/env ts-node
// CLI entry for Task 10 – placeholder only
// solutions/index.ts
import {ToDoManager} from './todo-manager';

function helper() {
  console.log('Use: npm run cli <command> [args]');
  console.log('Commands:');
  console.log('  init                         - Initialize with demo todo');
  console.log('  add <title> [description]    - Add a new todo');
  console.log('  complete <id>                - Mark todo as completed');
  console.log('  list                         - List all todos');
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const command: string | undefined = args[0];
  const commands: string[] = ['init', 'add', 'complete', 'list'];

  if (!command || !commands.includes(command)) {
    helper();
  } else {
    console.log(`Command: ${command}`);
    const manager = new ToDoManager();

    async function initHandler() {
      await manager.init();
      console.log('Demo todo created successfully\n');
      await listHandler()
    }

    async function addHandler() {
      if (!args[1]) {
        console.error('Error: Title is required argument for "add" command\n');
        helper();
        process.exit(1);
      }
      await manager.add(args[1], args[2] || '');
      console.log(`Todo added: "${args[1]}"\n`);
      await listHandler()
    }

    async function completeHandler() {
      if (!args[1]) {
        console.error('Error: ID is required argument for "complete" command\n');
        helper();
        process.exit(1);
      }
      const id = parseInt(args[1], 10);
      if (isNaN(id)) {
        console.error(`Error: ID must be a number`);
        process.exit(1);
      }
      await manager.complete(id);
      console.log(`Todo ${id} marked as completed`);
      await listHandler()
    }

    async function listHandler() {
      const todos = await manager.list();
      if (todos.length === 0) {
        console.log('There are no todos yet');
      } else {
        todos.forEach(todo => {
          console.log(`${todo.id}: [${todo.status}] Title="${todo.title}"`);
          if (todo.description) {
            console.log(`             Description=${todo.description}`);
          }
        });
      }
    }

    try {
      switch (command) {
        case 'init': {
          await initHandler();
          break;
        }

        case 'add': {
          await addHandler()
          break;
        }

        case 'complete': {
          await completeHandler();
          break;
        }

        case 'list': {
          await listHandler();
          break;
        }

        default: {
          console.error(`Unknown command: ${command}`);
          process.exit(1);
        }
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1);
  });