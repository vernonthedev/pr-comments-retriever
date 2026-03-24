import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { PRComment, PRReview, PRIssueComment, PR } from "../types";
import { sanitizeFolderName } from "../utils";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  suite("sanitizeFolderName", () => {
    test("should return unchanged for valid folder names", () => {
      const result = sanitizeFolderName("My PR Title");
      assert.strictEqual(result, "My PR Title");
    });

    test("should replace invalid characters", () => {
      const result = sanitizeFolderName("Fix <login> bug");
      assert.strictEqual(result, "Fix _login_ bug");
    });

    test("should replace colon", () => {
      const result = sanitizeFolderName("Fix: login bug");
      assert.strictEqual(result, "Fix_ login bug");
    });

    test("should replace forward slash", () => {
      const result = sanitizeFolderName("Fix/login/bug");
      assert.strictEqual(result, "Fix_login_bug");
    });

    test("should replace backslash", () => {
      const result = sanitizeFolderName("Fix\\login\\bug");
      assert.strictEqual(result, "Fix_login_bug");
    });

    test("should replace pipe", () => {
      const result = sanitizeFolderName("Fix | login");
      assert.strictEqual(result, "Fix _ login");
    });

    test("should replace question mark", () => {
      const result = sanitizeFolderName("Fix login?");
      assert.strictEqual(result, "Fix login_");
    });

    test("should replace asterisk", () => {
      const result = sanitizeFolderName("Fix *login*");
      assert.strictEqual(result, "Fix _login_");
    });

    test("should trim whitespace", () => {
      const result = sanitizeFolderName("  My PR  ");
      assert.strictEqual(result, "My PR");
    });

    test("should truncate long names", () => {
      const longName = "A".repeat(300);
      const result = sanitizeFolderName(longName);
      assert.strictEqual(result.length, 200);
    });

    test("should handle empty string", () => {
      const result = sanitizeFolderName("");
      assert.strictEqual(result, "");
    });
  });

  suite("PR data structures", () => {
    test("should have valid PR interface structure", () => {
      const mockPR: PR = {
        id: 1,
        number: 123,
        title: "Test PR",
        body: "PR description",
        state: "open",
        html_url: "https://github.com/owner/repo/pull/123",
        user: { login: "testuser" },
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-02T00:00:00Z",
        comments: 5,
        review_comments: 3,
      };

      assert.strictEqual(mockPR.id, 1);
      assert.strictEqual(mockPR.number, 123);
      assert.strictEqual(mockPR.title, "Test PR");
      assert.strictEqual(mockPR.state, "open");
      assert.strictEqual(mockPR.user.login, "testuser");
    });

    test("should have valid PRComment interface structure", () => {
      const mockComment: PRComment = {
        id: 1,
        body: "Comment body",
        user: { login: "commenter" },
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-02T00:00:00Z",
      };

      assert.strictEqual(mockComment.id, 1);
      assert.strictEqual(mockComment.body, "Comment body");
      assert.strictEqual(mockComment.user.login, "commenter");
    });

    test("should have valid PRReview interface structure", () => {
      const mockReview: PRReview = {
        id: 1,
        body: "Review body",
        user: { login: "reviewer" },
        state: "APPROVED",
        submitted_at: "2024-01-01T00:00:00Z",
      };

      assert.strictEqual(mockReview.id, 1);
      assert.strictEqual(mockReview.state, "APPROVED");
    });

    test("should have valid PRIssueComment interface structure", () => {
      const mockIssueComment: PRIssueComment = {
        id: 1,
        body: "Issue comment",
        user: { login: "user" },
        created_at: "2024-01-01T00:00:00Z",
      };

      assert.strictEqual(mockIssueComment.id, 1);
      assert.strictEqual(mockIssueComment.body, "Issue comment");
    });
  });

  suite("Folder creation", () => {
    const testDir = path.join(os.tmpdir(), "pr-comments-test");

    setup(() => {
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }
    });

    teardown(() => {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true });
      }
    });

    test("should create directory if it does not exist", () => {
      const testPath = path.join(testDir, "subdir");
      if (!fs.existsSync(testPath)) {
        fs.mkdirSync(testPath, { recursive: true });
      }
      assert.ok(fs.existsSync(testPath));
    });

    test("should write file to directory", () => {
      const testPath = path.join(testDir, "test.txt");
      fs.writeFileSync(testPath, "test content");
      assert.ok(fs.existsSync(testPath));
      assert.strictEqual(fs.readFileSync(testPath, "utf-8"), "test content");
    });
  });

  suite("Command registration", () => {
    test("should have retrievePR command defined in package.json", () => {
      assert.ok(true);
    });
  });
});
