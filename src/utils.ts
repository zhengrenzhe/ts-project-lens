import path from 'path';
import fs from 'fs';
import { consola } from 'consola';
import chalk from 'chalk';

export function filePathCheck(pathStr: string | undefined): string {
  if (!pathStr) {
    consola.error('pathStr is undefined');
    process.exit(1);
  }

  const absPath = path.resolve(pathStr);

  if (!fs.existsSync(absPath)) {
    consola.error(`${absPath} not exist`);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { version: string; module: any } {
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
    const modulePath = `${importFrom}/${moduleName}`;

    if (fs.existsSync(modulePath)) {
      const dynamicModule = require(modulePath);
      if (dynamicModule) {
        const pkgVersion = require(`${modulePath}/package.json`).version;
        consola.success(`use ${moduleName} from ${chalk.green(importFrom)}`);
        return {
          version: pkgVersion,
          module: dynamicModule,
        };
      }
    }
  }

  consola.success(
    `use ${moduleName} from ${chalk.green('ts-project-lens built-in')}`,
  );
  return {
    version: require(`${moduleName}/package.json`).version,
    module: require(moduleName),
  };
}
