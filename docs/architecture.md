# Autofill Architecture

This project now has one shared implementation used by both the standalone Vite test app and the Manifest V3 Chrome extension.

```text
apps/
  extension/        MV3 background, content script, popup, options
  web-test/         Vite playground with mocks and workflow inspection
packages/
  core/             Autofill domain logic, DOM scanning, planning, matching, execution
  shared/           Storage, runtime, tabs, injection adapters and typed messaging
  ui/               Reusable React UI primitives and app shell pieces
  workers/          Worker task queue plus fuzzy search worker bridge
```

Chrome APIs are isolated in `apps/extension/src/adapters` and never appear in `packages/core`.

## Decisions

- Fuse.js is used for fuzzy matching because the field dictionary is weighted, human-language heavy, and benefits more from typo tolerance than ultra-large full-text indexing. FlexSearch or MiniSearch can be added behind the same matcher interface if the corpus grows into thousands of records.
- Matching can run in a worker through `@autofill/workers`. The main pipeline still has a synchronous matcher path so content scripts stay simple and reliable.
- Storage is a port. The extension uses `chrome.storage.local`; the web app uses in-memory/local adapters.
- Runtime messaging is centralized through a typed request/response bus with timeout and retry handling.
- DOM scanning is shared and Chrome-free. Extension-specific injection is handled by adapters.

## Migration Notes

- Legacy files under `autofilljs/` are preserved as a reference sample. New code should import from `packages/*`.
- The previous CDN global Fuse usage is replaced by an npm dependency.
- The old pipeline passed raw DOM state through all stages. The new pipeline separates descriptors, plans, and execution handles.
- `runTask.js` had a control-flow bug where `continue` always ran before the action call. Execution now lives in `packages/core/src/execution/taskRunner.ts`.
