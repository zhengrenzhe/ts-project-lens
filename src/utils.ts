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

export function fileGlobCheck(
  basePath: string,
  fileGlob: string | undefined,
): string {
  if (!fileGlob) {
    return `${path.dirname(basePath)}/**/**`;
  }
  return fileGlob;
}

export function walkUpFind(
  checker: (baseDir: string) => boolean,
  start: string,
) {
  const f = start.split('/');
  while (f.length !== 0) {
    const baseDir = f.join('/');
    if (checker(baseDir)) {
      return baseDir;
    }
    f.pop();
  }
}

export function dynamicImport(
  start: string,
  moduleName: string,
  node_modules: string | undefined,
): { version: string; module: unknown } {
  const importFrom = (() => {
    if (node_modules) {
      return path.resolve(node_modules);
    }

    const dir = walkUpFind(
      (base) => fs.existsSync(`${base}/node_modules`),
      start,
    );
    if (dir) {
      return `${dir}/node_modules`;
    }
  })();

  if (importFrom) {
    console.log(`import ${moduleName} from ${importFrom}`);

    const modulePath = `${importFrom}/${moduleName}`;

    if (fs.existsSync(modulePath)) {
      const dynamicModule = require(modulePath);
      if (dynamicModule) {
        const pkgVersion = require(`${modulePath}/package.json`).version;
        return {
          version: pkgVersion,
          module: dynamicModule,
        };
      }
    }
  }

  console.log(`use built-in ${moduleName}`);
  return {
    version: require(`${moduleName}/package.json`).version,
    module: require(moduleName),
  };
}
