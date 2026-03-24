import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import os from "os";
import axios from "axios";

interface PRComment {
  id: number;
  body: string;
  user: { login: string };
  created_at: string;
  updated_at: string;
}

interface PRReview {
  id: number;
  body: string;
  user: { login: string };
  state: string;
  submitted_at: string;
}

interface PRIssueComment {
  id: number;
  body: string;
  user: { login: string };
  created_at: string;
}

interface PR {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  user: { login: string };
  created_at: string;
  updated_at: string;
  comments: number;
  review_comments: number;
}

async function getGitHubToken(): Promise<string | undefined> {
  const config = vscode.workspace.getConfiguration("github-pr-comments-retriever");
  return config.get<string>("token");
}

async function fetchPR(owner: string, repo: string, prNumber: number, token?: string): Promise<PR> {
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await axios.get<PR>(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
    { headers }
  );
  return response.data;
}

async function fetchPRComments(owner: string, repo: string, prNumber: number, token?: string): Promise<PRComment[]> {
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await axios.get<PRComment[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/comments`,
    { headers }
  );
  return response.data;
}

async function fetchPRReviews(owner: string, repo: string, prNumber: number, token?: string): Promise<PRReview[]> {
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await axios.get<PRReview[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`,
    { headers }
  );
  return response.data;
}

async function fetchIssueComments(owner: string, repo: string, prNumber: number, token?: string): Promise<PRIssueComment[]> {
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await axios.get<PRIssueComment[]>(
    `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    { headers }
  );
  return response.data;
}

function sanitizeFolderName(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, "_").trim().slice(0, 200);
}

async function savePRData(owner: string, repo: string, prNumber: number): Promise<string> {
  const token = await getGitHubToken();

  const [pr, prComments, reviews, issueComments] = await Promise.all([
    fetchPR(owner, repo, prNumber, token),
    fetchPRComments(owner, repo, prNumber, token),
    fetchPRReviews(owner, repo, prNumber, token),
    fetchIssueComments(owner, repo, prNumber, token),
  ]);

  const baseDir = path.join(os.homedir(), "github-prs");
  const prDir = path.join(baseDir, sanitizeFolderName(pr.title));

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  if (!fs.existsSync(prDir)) {
    fs.mkdirSync(prDir, { recursive: true });
  }

  const metadata = {
    owner,
    repo,
    prNumber: pr.number,
    title: pr.title,
    state: pr.state,
    url: pr.html_url,
    author: pr.user.login,
    createdAt: pr.created_at,
    updatedAt: pr.updated_at,
    prBody: pr.body,
    commentsCount: pr.comments,
    reviewCommentsCount: pr.review_comments,
  };

  fs.writeFileSync(
    path.join(prDir, "metadata.json"),
    JSON.stringify(metadata, null, 2)
  );

  if (pr.body) {
    fs.writeFileSync(path.join(prDir, "description.md"), pr.body);
  }

  if (prComments.length > 0) {
    const commentsContent = prComments.map((c) => {
      return `---
ID: ${c.id}
Author: ${c.user.login}
Created: ${c.created_at}
Updated: ${c.updated_at}
---

${c.body}
`;
    }).join("\n\n");
    fs.writeFileSync(path.join(prDir, "pr-comments.md"), commentsContent);
  }

  if (reviews.length > 0) {
    const reviewsContent = reviews.map((r) => {
      return `---
ID: ${r.id}
Author: ${r.user.login}
State: ${r.state}
Submitted: ${r.submitted_at}
---

${r.body || "(no review body)"}
`;
    }).join("\n\n");
    fs.writeFileSync(path.join(prDir, "reviews.md"), reviewsContent);
  }

  if (issueComments.length > 0) {
    const issueCommentsContent = issueComments.map((c) => {
      return `---
ID: ${c.id}
Author: ${c.user.login}
Created: ${c.created_at}
---

${c.body}
`;
    }).join("\n\n");
    fs.writeFileSync(path.join(prDir, "issue-comments.md"), issueCommentsContent);
  }

  return prDir;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "github-pr-comments-retriever.retrievePR",
    async () => {
      try {
        const token = await getGitHubToken();
        if (!token) {
          const setting = await vscode.window.showInputBox({
            prompt: "No GitHub token configured. Please enter your GitHub Personal Access Token",
            password: true,
          });
          if (!setting) {
            vscode.window.showWarningMessage("Token required to access GitHub API");
            return;
          }
          const config = vscode.workspace.getConfiguration("github-pr-comments-retriever");
          await config.update("token", setting, vscode.ConfigurationTarget.Global);
        }

        const repoInput = await vscode.window.showInputBox({
          prompt: "Enter owner/repo (e.g., microsoft/vscode)",
          placeHolder: "owner/repo",
        });
        if (!repoInput) {
          return;
        }

        const [owner, repo] = repoInput.split("/");
        if (!owner || !repo) {
          vscode.window.showErrorMessage("Invalid format. Use owner/repo");
          return;
        }

        const prNumberInput = await vscode.window.showInputBox({
          prompt: "Enter PR number",
          placeHolder: "PR number",
        });
        if (!prNumberInput) {
          return;
        }

        const prNumber = parseInt(prNumberInput, 10);
        if (isNaN(prNumber)) {
          vscode.window.showErrorMessage("Invalid PR number");
          return;
        }

        vscode.window.showInformationMessage(`Retrieving PR #${prNumber} from ${owner}/${repo}...`);

        const prDir = await savePRData(owner, repo, prNumber);

        vscode.window.showInformationMessage(`PR data saved to: ${prDir}`);
        const doc = await vscode.workspace.openTextDocument(prDir);
        await vscode.window.showTextDocument(doc);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            vscode.window.showErrorMessage("Authentication failed. Please check your GitHub token.");
          } else if (error.response?.status === 404) {
            vscode.window.showErrorMessage("PR not found. Check the owner/repo and PR number.");
          } else {
            vscode.window.showErrorMessage(`GitHub API error: ${error.response?.status} - ${error.response?.statusText}`);
          }
        } else {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
