import type { RuntimeAdapter, RuntimeEnvelope, RuntimeResponse } from "@autofill/shared";

export class ChromeRuntimeAdapter implements RuntimeAdapter {
  async send<TResponse>(message: RuntimeEnvelope): Promise<RuntimeResponse<TResponse>> {
    return (await chrome.runtime.sendMessage(message)) as RuntimeResponse<TResponse>;
  }

  onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void {
    const listener = (
      message: RuntimeEnvelope,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: RuntimeResponse) => void,
    ) => {
      Promise.resolve(handler(message))
        .then(sendResponse)
        .catch((error) =>
          sendResponse({
            ok: false,
            error: error instanceof Error ? error.message : "runtime_handler_failed",
          }),
        );
      return true;
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }
}
