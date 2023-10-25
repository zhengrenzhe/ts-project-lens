import boxen from 'boxen';
import chalk from 'chalk';

export function eslint(eslintConfig: string) {
  console.log(
    boxen('TS Lens', {
      borderStyle: 'bold',
      borderColor: '#3178c6',
      padding: { top: 1, bottom: 1, left: 8, right: 8 },
      textAlignment: 'right',
      float: 'center',
    }),
  );

  console.log(chalk.white(`eslint config: ${eslintConfig}`));
}
