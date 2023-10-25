import path from 'path';
import chalk from 'chalk';
import { dynamicImport } from './utils';

export function eslint(
  eslintConfig: string,
  fileGlob: string,
  node_modules: string | undefined,
) {
  console.log(chalk.white(`eslint config: ${eslintConfig}`));
  console.log(chalk.white(`eslint files glob: ${fileGlob}`));

  const dynamicESLint = dynamicImport(
    path.dirname(eslintConfig),
    'eslint',
    node_modules,
  );
  console.log(`eslint@${dynamicESLint.version}`);
}
