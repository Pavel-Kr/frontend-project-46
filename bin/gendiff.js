#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2, options) => {
    console.log(genDiff(file1, file2, options.format));
  });

program.parse();
