#!/usr/bin/env node
import { program } from 'commander';
import parseFile from '../src/parseFile.js';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2) => {
    const data1 = parseFile(file1);
    const data2 = parseFile(file2);
    console.log(genDiff(data1, data2));
  });

program.parse();
