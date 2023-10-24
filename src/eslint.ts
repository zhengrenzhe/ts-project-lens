import boxen from 'boxen';

export function eslint(eslintConfig: string) {
  console.log(
    boxen('TS Lens', {
      backgroundColor: '#3178c6',
      borderStyle: 'none',
      width: 8,
      padding: { top: 2, bottom: 0, left: 0, right: 0 },
      textAlignment: 'right',
    }),
  );
  console.log(eslintConfig);
}
