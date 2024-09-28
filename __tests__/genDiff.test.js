import genDiff from '../src/genDiff.js';
import parseFile from '../src/parseFile.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

test('gendiff', () => {
  const file1 = parseFile(getFixturePath('file1.json'));
  const file2 = parseFile(getFixturePath('file2.json'));
  const expected = readFile('expected.txt');
  expect(genDiff(file1, file2)).toEqual(expected);
});