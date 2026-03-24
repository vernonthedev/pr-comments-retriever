<p align="center">
  <img src="./assets/github-pr-logo.png" alt="Github PR Extension logo" width="160" />
</p>

# GitHub PR Comments Retriever

A VSCode extension to retrieve and save all comments from a GitHub pull request, including reviews, issue comments, and descriptions.

## Features

- Retrieve all PR data including metadata, description, reviews, PR comments, and issue comments
- Saves data to `~/github-prs/<PR-title>/` directory
- Supports all comment types including AI agent comments (CodeRabbit, Codex, Qodo, Claude, etc.)
- GitHub Personal Access Token (PAT) authentication
- Handles pagination for large numbers of comments

## Requirements

- GitHub Personal Access Token with `repo` scope (for private repos) or public repo access
- Node.js 18+ (for development)

## Setup

### 1. Generate a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` - for private repositories
   - `public_repo` - for public repositories only
4. Copy the generated token

### 2. Configure the Token

**Option A: Configure in VSCode Settings**

1. Open VSCode Settings (Ctrl+, or Cmd+,)
2. Search for "GitHub PR Comments Retriever"
3. Add your token to the "Token" field

**Option B: Enter when prompted**
The extension will prompt you for a token if none is configured.

## Usage

1. Open VSCode
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. Type "Retrieve PR Comments" and press Enter
4. Enter the repository in format `owner/repo` (e.g., `microsoft/vscode`)
5. Enter the PR number (e.g., `123`)

## Extension Settings

This extension contributes the following settings:

- `github-pr-comments-retriever.token` - GitHub Personal Access Token for API authentication

## Output Files

Each PR is saved to its own folder named after the PR title under `~/github-prs/`:

```
~/github-prs/
├── "Fix login bug"/
│   ├── metadata.json
│   ├── description.md
│   ├── pr-comments.md
│   ├── reviews.md
│   └── issue-comments.md
├── "Add dark mode support"/
│   ├── metadata.json
│   └── ...
└── ...
```

| File                | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `metadata.json`     | PR metadata (number, state, author, dates, URLs, etc.) |
| `description.md`    | PR body/description                                    |
| `pr-comments.md`    | PR review comments (line-by-line comments)             |
| `reviews.md`        | PR reviews (approval, changes requested, etc.)         |
| `issue-comments.md` | Issue-level comments (general PR discussions)          |

## Development

```bash
# Install dependencies
pnpm install

# Watch mode for development
pnpm run watch

# Build for production
pnpm run package
```

## Known Issues

- Rate limiting may occur without a GitHub token (60 requests/hour limit)
- Very large PRs with many comments may take longer to fetch

---

Developed by @vernonthedev ❤️
