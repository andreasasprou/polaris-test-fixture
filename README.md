# polaris-test-fixture

Test fixture repository for Polaris local development and E2E testing.

This repo is used by:
- `scripts/test-pi-github-bootstrap.ts` — programmatic bootstrap tests
- `scripts/test-pi-repo-e2e.ts` — real Pi agent E2E tests
- `/api/dev/auto-login` — dev auto-login seeds this repo for UI testing
- `/dogfood` and `/agent-browser` — browser-based QA

## Files

- `src/index.ts` — simple TypeScript module
- `src/utils.ts` — utility functions
- `.polaris/` — Polaris config (if any)
