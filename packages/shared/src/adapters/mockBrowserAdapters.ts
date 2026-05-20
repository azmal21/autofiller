import type {
  BrowserTab,
  DomInjectionAdapter,
  RuntimeAdapter,
  RuntimeEnvelope,
  RuntimeResponse,
  TabsAdapter,
} from "../ports";

export class MockRuntimeAdapter implements RuntimeAdapter {
  private handler:
    | ((message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse)
    | undefined;

  async send<TResponse>(message: RuntimeEnvelope): Promise<RuntimeResponse<TResponse>> {
    if (!this.handler) {
      return { ok: false, error: "mock_runtime_handler_missing" };
    }

    return (await this.handler(message)) as RuntimeResponse<TResponse>;
  }

  onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void {
    this.handler = handler;
    return () => {
      this.handler = undefined;
    };
  }
}

export class MockTabsAdapter implements TabsAdapter {
  private tabs: BrowserTab[] = [
    {
      id: 1,
      title: "Mock Greenhouse Application",
      url: "https://mock.local/jobs/frontend-engineer",
      active: true,
    },
  ];

  async queryCurrent(): Promise<BrowserTab | null> {
    return this.tabs.find((tab) => tab.active) ?? null;
  }

  async list(): Promise<BrowserTab[]> {
    return [...this.tabs];
  }
}

export class MockDomInjectionAdapter implements DomInjectionAdapter {
  constructor(private readonly handlers: Record<string, (payload?: unknown) => unknown | Promise<unknown>>) {}

  async execute<T>(_tabId: number, taskName: string, payload?: unknown): Promise<T> {
    const handler = this.handlers[taskName];
    if (!handler) {
      throw new Error(`mock_injection_handler_missing:${taskName}`);
    }

    return (await handler(payload)) as T;
  }
}
