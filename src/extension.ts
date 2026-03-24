import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "github-pr-comments-retriever" is now active!',
  );
  const disposable = vscode.commands.registerCommand(
    "github-pr-comments-retriever.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from github-pr-comments-retriever!",
      );
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
