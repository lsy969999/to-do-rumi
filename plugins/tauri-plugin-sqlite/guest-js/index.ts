import { invoke } from '@tauri-apps/api/core'

export async function ping(value: string): Promise<string | null> {
  return await invoke<{value?: string}>('plugin:sqlite|ping', {
    payload: {
      value,
    },
  }).then((r) => {
    console.log('ping', r);
    return (r.value ? r.value : null)
  });
}
