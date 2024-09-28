#!/usr/bin/env node
import { program } from "commander";
import parseFile from "../src/parseFile.js";

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2, options) => {
    const data1 = parseFile(file1);
    const data2 = parseFile(file2);
    console.log(data1);
    console.log(data2);
  });

program.parse();
