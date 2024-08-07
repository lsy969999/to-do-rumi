import { invoke } from '@tauri-apps/api/core'

export async function ping(ping: string): Promise<string | null> {
    const { value } = await invoke<{value: string | null}>('plugin:sqlite|ping', {
        payload: {
        value: ping,
        },
    });
    console.log('value: ' +value)
    return value
}

export async function getDbUserVersion(): Promise<number | null> {
    const { version } = await invoke<{version: number | null}>('plugin:sqlite|get_db_user_version');
    return version;
}

export type Todo = {
    sn: number
    todo: string
}

export async function getAllTodo(): Promise<Todo[]> {
    const {todos} = await invoke<{todos: Todo[]}>('plugin:sqlite|get_all_todo');
    return todos
} 

export async function insertTodo(todo: string): Promise<number> {
    const { rowid } = await invoke<{rowid: number}>('plugin:sqlite|insert_todo', {
      payload: {
        todo,
      },
    });
    return rowid;
}