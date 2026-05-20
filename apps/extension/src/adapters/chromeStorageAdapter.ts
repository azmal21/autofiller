import type { StorageAdapter } from "@autofill/shared";

export class ChromeStorageAdapter implements StorageAdapter {
  constructor(private readonly area: chrome.storage.StorageArea = chrome.storage.local) {}

  async get<T>(key: string): Promise<T | undefined> {
    const result = await this.area.get(key);
    return result[key] as T | undefined;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.area.set({ [key]: value });
  }

  async remove(key: string): Promise<void> {
    await this.area.remove(key);
  }

  async clear(): Promise<void> {
    await this.area.clear();
  }
}
