import path from 'path';
import fs from 'fs';

export function filePathCheck(pathStr: string | undefined): string {
  if (!pathStr) {
    console.error('文件路径不能为空');
    process.exit(1);
  }

  const absPath = path.resolve(pathStr);

  if (!fs.existsSync(absPath)) {
    console.error(`${absPath} 不存在`);
    process.exit(1);
  }

  return path.resolve(pathStr);
}
