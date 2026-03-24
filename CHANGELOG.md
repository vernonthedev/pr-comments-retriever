# Change Log

All notable changes to the "github-pr-comments-retriever" extension are documented in this file.

## [0.1.2](https://github.com/vernonthedev/pr-comments-retriever/compare/v0.1.1...v0.1.2) (2026-03-24)


### Bug Fixes

* update pnpm lockfile with overrides config ([edae609](https://github.com/vernonthedev/pr-comments-retriever/commit/edae60990a0f61c1e268cb88904311bc014f2ab6))

## [0.1.1](https://github.com/vernonthedev/pr-comments-retriever/compare/v0.1.0...v0.1.1) (2026-03-24)


### Bug Fixes

* add pnpm overrides and update vsce commands for CI ([a0f4c2c](https://github.com/vernonthedev/pr-comments-retriever/commit/a0f4c2c1ed0f8b506ed822b2b1d435bfeee721d3))

## [0.1.0](https://github.com/vernonthedev/pr-comments-retriever/compare/v0.0.1...v0.1.0) (2026-03-24)


### Features

* add axios dependency and GitHub token configuration ([23ef765](https://github.com/vernonthedev/pr-comments-retriever/commit/23ef76582b8cfe756a8262d19d7ec0f3759c2add))
* add configurable save location setting ([ab8446c](https://github.com/vernonthedev/pr-comments-retriever/commit/ab8446cc0a4929f9108884bb01f4c45351bebde7))
* add current release section to README ([ef24de3](https://github.com/vernonthedev/pr-comments-retriever/commit/ef24de37f3e3b81bcf74aa9e0735c091062a109a))
* add keybinding and command palette entry ([93210cf](https://github.com/vernonthedev/pr-comments-retriever/commit/93210cf18c9621b4a398f4f753f5b6daa52b5c19))
* add logo to extension ([e43f00b](https://github.com/vernonthedev/pr-comments-retriever/commit/e43f00bafd26460897e2cbad0e5078d92a69c56b))
* implement PR comments retrieval command ([6dbb79b](https://github.com/vernonthedev/pr-comments-retriever/commit/6dbb79b43040954b5f58d093980edc1031be4767))
* prepend PR number to folder name ([ebc612a](https://github.com/vernonthedev/pr-comments-retriever/commit/ebc612a8d2d2013e46b1a05e06a50f2544452e9c))


### Bug Fixes

* add actions permission for release-please ([0f408c6](https://github.com/vernonthedev/pr-comments-retriever/commit/0f408c6685c5088b8c99127e1d354e565bd5646d))
* add node and mocha types to tsconfig ([fffcc09](https://github.com/vernonthedev/pr-comments-retriever/commit/fffcc09d308a79555dd27e42b5619167bb1c6069))
* add pnpm version specification to workflows and package.json ([6234317](https://github.com/vernonthedev/pr-comments-retriever/commit/62343178605196a4fc6d8fee9b58db54e5b68b21))
* cache token in memory to avoid repeated config reads ([9f71005](https://github.com/vernonthedev/pr-comments-retriever/commit/9f710056711c7eb1cf7a143cb4794e6c34cfc502))
* fix indentation in xvfb command ([aefe1ac](https://github.com/vernonthedev/pr-comments-retriever/commit/aefe1acdfdebc7eb201dec604b598af216c10ac6))
* manually set up xvfb for VSCode tests ([cc7c64d](https://github.com/vernonthedev/pr-comments-retriever/commit/cc7c64dc08f49bc8024dea93acbd4b75a713e32f))
* move PR template into pull_request_template directory ([7518759](https://github.com/vernonthedev/pr-comments-retriever/commit/7518759f226ee9a09569e423e63e7eabed643336))
* open folder in explorer instead of trying to open directory as file ([be55e9f](https://github.com/vernonthedev/pr-comments-retriever/commit/be55e9f5e0e782fe447703a0c8d0fb2b479172ba))
* remove duplicate pnpm version from workflows (using packageManager now) ([075edd8](https://github.com/vernonthedev/pr-comments-retriever/commit/075edd8a16c0e0df429e02e71655f9551e48925f))
* remove invalid versioning from release-please config ([64fba53](https://github.com/vernonthedev/pr-comments-retriever/commit/64fba53cda7e3f6e58d52b98d2f34d59b7478575))
* remove revealFileInOS call to keep focus in VSCode ([9bfdd95](https://github.com/vernonthedev/pr-comments-retriever/commit/9bfdd9512adbee45590c8185da73193733d7eec7))
* trim token whitespace before checking if empty ([e6e50da](https://github.com/vernonthedev/pr-comments-retriever/commit/e6e50da24ae5e226bf38c85cb8aec1eaa17f6359))
* update cached token after saving to config ([6a6ccb0](https://github.com/vernonthedev/pr-comments-retriever/commit/6a6ccb0cf8e5d8aae8428f8c79cd04d1a141c634))
* use revealFileInOS command with proper Uri ([9eb5e25](https://github.com/vernonthedev/pr-comments-retriever/commit/9eb5e25a8a712382eb350c6d2d57970e6bc6731c))
* use xvfb for running VSCode tests on CI ([e15c060](https://github.com/vernonthedev/pr-comments-retriever/commit/e15c060f971509eeb73af7732b13b1a5f9a7c28b))

## [Unreleased]

## [0.0.1] - 2026-03-24

### Added

- **PR Data Retrieval**: Fetch all PR data including metadata, description, reviews, PR comments, and issue comments
- **GitHub API Integration**: Uses GitHub REST API with Personal Access Token authentication
- **Multiple Comment Types**: Supports PR review comments, reviews, and issue comments (includes AI agent comments from CodeRabbit, Codex, Qodo, Claude, etc.)
- **Configurable Save Location**: Option to save to workspace folder (default) or home directory
- **Keyboard Shortcut**: Ctrl+Shift+G (Cmd+Shift+G on macOS) for quick access
- **Command Palette**: "Retrieve PR Comments" command available via Ctrl+Shift+P

### Features

- **Token Caching**: Token is cached in memory after first entry for the session
- **Persistent Token**: Token saved to VSCode global settings (persists across restarts)
- **Auto-save**: PR data automatically saved to `github-prs/<PR-number> <PR-title>/` folder
- **Structured Output**:
  - `metadata.json` - PR metadata (number, state, author, dates, URLs)
  - `description.md` - PR body/description
  - `pr-comments.md` - PR review comments
  - `reviews.md` - PR reviews
  - `issue-comments.md` - Issue-level comments

### Fixed

- Token whitespace trimming issue
- Folder naming with invalid characters
- Default save location changed to workspace

### Technical

- Separated types and utilities into dedicated modules (`types.ts`, `utils.ts`)
- Added unit tests for core functionality
- Uses TypeScript with strict mode
- Built with webpack for production
