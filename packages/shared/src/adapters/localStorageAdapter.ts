import type { StorageAdapter } from "../ports";

export class LocalStorageAdapter implements StorageAdapter {
  constructor(private readonly namespace = "autofill") {}

  async get<T>(key: string): Promise<T | undefined> {
    const raw = localStorage.getItem(this.toKey(key));
    return raw ? (JSON.parse(raw) as T) : undefined;
  }

  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(this.toKey(key), JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(this.toKey(key));
  }

  async clear(): Promise<void> {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`${this.namespace}:`))
      .forEach((key) => localStorage.removeItem(key));
  }

  private toKey(key: string) {
    return `${this.namespace}:${key}`;
  }
}
