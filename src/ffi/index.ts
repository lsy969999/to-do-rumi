import { isTauri } from "@tauri-apps/api/core";
// import { eol, platform, family, version, type, arch, locale, exeExtension, hostname } from '@tauri-apps/plugin-os';
import { message, confirm } from '@tauri-apps/plugin-dialog';

export function os() {
    if (isTauri()) {
        // TODO
    } else {
        // TODO
    }
}

export async function alertMessage(msg: string) {
    if (isTauri()) {
        await message(msg);
    } else {
        window.alert(msg);
    }
}

export async function confirmMessage(msg: string) {
    if (isTauri()) {
        await confirm(msg);
    } else {
        window.confirm(msg);
    }
}

export async function toast(msg: string) {
    if (isTauri()) {
        // TODO
    } else {
        // TODO
    }
}