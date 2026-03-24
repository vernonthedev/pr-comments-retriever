export function sanitizeFolderName(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, "_").trim().slice(0, 200);
}
