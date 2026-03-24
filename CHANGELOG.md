# Change Log

All notable changes to the "github-pr-comments-retriever" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.1] - 2024-03-24

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
