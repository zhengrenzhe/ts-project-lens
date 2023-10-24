#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { eslint } from './eslint';
import { filePathCheck } from './utils';

yargs(hideBin(process.argv))
  .command(
    'eslint',
    'eslint subcommand',
    (y) => {
      const cfg = y
        .demandOption(['config'])
        .showHelpOnFail(true)
        .option('config', {
          alias: 'c',
          type: 'string',
          requiresArg: true,
          description: 'eslint config file',
        });
      return cfg;
    },
    (arg) => {
      const configPath = filePathCheck(arg.config);
      eslint(configPath);
    },
  )
  .command('ts', 'ts subcommand', (y) => {
    y.demandOption([]).showHelpOnFail(true);
  })
  .demandCommand()
  .showHelpOnFail(true)
  .parse();
