import path from 'path';
import chalk from 'chalk';
import { consola } from 'consola';

import { dynamicImport } from '../utils';
import { getLintResults } from './utils';

consola.level = 999;

export async function eslint(
  eslintConfig: string,
  fileGlob: string,
  node_modules: string | undefined,
) {
  consola.box(require('../../package.json').name);

  consola.success(
    chalk.white(`ESLint config file: ${chalk.green(eslintConfig)}`),
  );
  consola.success(chalk.white(`lint glob: ${chalk.green(fileGlob)}`));

  const dynamicESLint = dynamicImport(
    path.dirname(eslintConfig),
    'eslint',
    node_modules,
  );
  consola.success(`eslint@${dynamicESLint.version}`);

  const result = await getLintResults(dynamicESLint, fileGlob);

  if (!result) {
    consola.error(chalk.red('eslint has no result'));
    return;
  }

  const count = result.map((f) => f.messages).flat().length;
  consola.success(count);
}
