import { invoke } from '@tauri-apps/api/core'

export async function ping(value: string): Promise<string | null> {
  return await invoke<{value?: string}>('plugin:sqlite|ping', {
    payload: {
      value,
    },
  }).then((r) => {
    return (r.value ? r.value : null)
  });
}

export async function get_db_user_version(): Promise<number | null> {
    return await invoke<{version?: number}>('plugin:sqlite|get_db_user_version').then((r) => {
        return (r.version ? r.version : null)
    });
}

export type Todo = {
    sn: number
    todo: string
}

export async function get_all_todo(): Promise<Todo[]> {
    return await invoke<Todo[]>('plugin:sqlite|get_all_todo').then((r) => {
        console.log(r)
        return r
    });
}

export async function insert_todo(todo: string): Promise<number | null> {
    return await invoke<{rowid: number}>('plugin:sqlite|insert_todo', {
      payload: {
        todo,
      },
    }).then((r) => {
      return (r.rowid ? r.rowid : null)
    });
  }