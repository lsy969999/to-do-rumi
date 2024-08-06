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