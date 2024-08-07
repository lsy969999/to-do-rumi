import { isTauri } from "@tauri-apps/api/core";
import { type } from '@tauri-apps/plugin-os';
import { message, confirm } from '@tauri-apps/plugin-dialog';
import { Store } from '@tauri-apps/plugin-store';

type Platform = "web-mobile-android" | "web-mobile-ios" | "tauri-mobile-android" | "tauri-mobile-ios" | "web-desktop-window" | "web-desktop-linux" | "web-desktop-mac" | "tauri-desktop-window" | "tauri-desktop-linux" | "tauri-desktop-mac" | "tauri-unknown" | "web-unknown";
export function platform(): Platform {
    if (isTauri()) {
        let t = type();
        if (t === "android")
            return "tauri-mobile-android";
        else if (t === "ios")
            return "tauri-mobile-ios";
        else if (t === "linux")
            return "tauri-desktop-linux";
        else if (t === "macos")
            return "tauri-desktop-mac";
        else if (t === "windows")
            return "tauri-desktop-window";
        else
            return "tauri-unknown"
    } else {
        const userAgent = navigator.userAgent;
        if (/Mobile|Tablet/i.test(userAgent)) {
            if (/android/i.test(userAgent))
                return "web-mobile-android";
            else if (/iPhone|iPad|iPod/i.test(userAgent) && !(window as any).MSStream)
                return "web-mobile-ios";
            else
                return "web-unknown";
        } else if (/Windows NT|Macintosh|Linux/i.test(userAgent)) {
            if (/Mac OS X/.test(userAgent))
                return "web-desktop-mac";
            else if (/Linux/.test(userAgent))
                return "web-desktop-linux";
            else if (/Win(dows )?NT/i.test(userAgent))
                return "web-desktop-window";
            else
                return "web-unknown";
        } else {
            return "web-unknown"
        }
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


const store = new Store('store.bin');
export async function storeSet<T>(key: string, value: T) {
    if (isTauri()) {
        await store.set(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export async function storeGet<T>(key: string): Promise<T | null> {
    if (isTauri()) {
        return await store.get<T>(key);
    } else {
        return localStorage.getItem(key) as T;
    }
}

export async function storeRemove(key: string) {
    if (isTauri()) {
        await store.delete(key);
    } else {
        localStorage.removeItem(key);
    }
}

export async function storeClear() {
    if (isTauri()) {
        await store.clear();
    } else {
        localStorage.clear();
    }
}

export async function storeKeys(): Promise<string[]> {
    if (isTauri()) {
        return await store.keys();
    } else {
        return Object.keys(localStorage)
    }
}