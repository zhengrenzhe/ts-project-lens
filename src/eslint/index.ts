import path from 'path';
import chalk from 'chalk';
import { dynamicImport } from '../utils';
import { getLintResults } from './utils';

export async function eslint(
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

  const result = await getLintResults(dynamicESLint, fileGlob);

  if (!result) {
    console.log(chalk.red('eslint has no result'));
    return;
  }

  const count = result.map((f) => f.messages).flat().length;
  console.log(count);
}
