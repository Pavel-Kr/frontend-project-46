import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

test('gendiff JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('gendiff YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('gendiff plain JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expectedPlain.txt'));
  expect(genDiff(file1, file2, 'plain')).toEqual(expected);
});

test('gendiff plain YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expectedPlain.txt'));
  expect(genDiff(file1, file2, 'plain')).toEqual(expected);
});

test('gendiff json JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected.json'));
  expect(genDiff(file1, file2, 'json')).toEqual(expected);
});

test('gendiff json YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected.json'));
  expect(genDiff(file1, file2, 'json')).toEqual(expected);
});

test('incorrect format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = 'Incorrect format: error';
  expect(genDiff(file1, file2, 'error')).toEqual(expected);
});
