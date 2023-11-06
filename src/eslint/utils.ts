import type { ESLint } from 'eslint';
import { dynamicImport } from '../utils';

export async function getLintResults(
  dynamicESLint: ReturnType<typeof dynamicImport>,
  fileGlob: string,
) {
  const eslint = new dynamicESLint.module.ESLint();

  const files = (await eslint.lintFiles([fileGlob])) as Pick<
    ESLint.LintResult,
    | 'filePath'
    | 'errorCount'
    | 'fatalErrorCount'
    | 'warningCount'
    | 'fixableErrorCount'
    | 'fixableWarningCount'
    | 'messages'
  >[];
  return files;
}
