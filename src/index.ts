#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { eslint } from './eslint';
import { fileGlobCheck, filePathCheck } from './utils';

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
        })
        .option('file-glob', {
          alias: 'f',
          type: 'string',
          description: 'lint files glob, default: "./**/**"',
        })
        .option('node_modules', {
          alias: 'n',
          type: 'string',
          description: 'import eslint from',
        });
      return cfg;
    },
    (arg) => {
      const configPath = filePathCheck(arg.config);
      const fileGlob = fileGlobCheck(configPath, arg.fileGlob);
      const node_modules = arg.node_modules;
      eslint(configPath, fileGlob, node_modules);
    },
  )
  .command('ts', 'ts subcommand', (y) => {
    y.demandOption([]).showHelpOnFail(true);
  })
  .demandCommand()
  .showHelpOnFail(true)
  .parse();
