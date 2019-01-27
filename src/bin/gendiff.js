#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', `Output formats:
                                  "simple" - shows diffs as a tree
                                  "plain" - shows diffs as a list
                                  "json" - shows diffs as a json`, 'simple')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(`${genDiff(firstConfig, secondConfig, commander.format)}`))
  .parse(process.argv);
