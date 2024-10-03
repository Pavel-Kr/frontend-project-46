import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

test.each([
  ['stylish', 'json', 'expected.txt'],
  ['stylish', 'yml', 'expected.txt'],
  ['plain', 'json', 'expectedPlain.txt'],
  ['plain', 'yml', 'expectedPlain.txt'],
  ['json', 'json', 'expected.json'],
  ['json', 'yml', 'expected.json'],
])('gendiff %s %s', (outputFormat, inputFormat, expectedPath) => {
  const file1 = getFixturePath(`file1.${inputFormat}`);
  const file2 = getFixturePath(`file2.${inputFormat}`);
  const expected = readFile(getFixturePath(expectedPath));
  expect(genDiff(file1, file2, outputFormat)).toEqual(expected);
});

test('default formatter', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('incorrect format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = 'Error: Incorrect format: error';
  expect(genDiff(file1, file2, 'error')).toEqual(expected);
});
