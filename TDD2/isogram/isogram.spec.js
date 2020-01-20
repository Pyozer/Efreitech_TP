import { isogram } from './isogram';

describe('isogram', () => {
  test('it returns false for "isograms"', () => {
    expect(isogram('isograms')).toBe(false);
  });

  test('it returns true for "background"', () => {
    expect(isogram('background')).toBe(true);
  });

  test('it returns true for "downstream"', () => {
    expect(isogram('downstream')).toBe(true);
  });

  test('it returns true for "six-year-old"', () => {
    expect(isogram('six-year-old')).toBe(true);
  });

  test('it returns true for "@@--word"', () => {
    expect(isogram('@@--word')).toBe(true);
  });

  test('it returns true for "{{hi}}"', () => {
    expect(isogram('{{hi}}')).toBe(true);
  });

  test('it returns false for "{{hello}}"', () => {
    expect(isogram('{{hello}}')).toBe(false);
  });

  test('it returns true for "_hi guys_"', () => {
    expect(isogram('_hi guys_')).toBe(true);
  });

  test('it returns false for "aA"', () => {
    expect(isogram('aA')).toBe(false);
  });

  test('it returns false for "{{BMW  E36    1.9L}}"', () => {
    expect(isogram('{{BMW  E36    1.9L}}')).toBe(true);
  });

  test('it returns true for "!_-=$%#@"', () => {
    expect(isogram('!_-=$%#@')).toBe(true);
  });

  test('it returns true for ""', () => {
    expect(isogram('')).toBe(true);
  });

  test('it should throw an exception for undefined', () => {
    expect(() => isogram()).toThrowError();
  });

  test('it should throw an exception for null', () => {
    expect(() => isogram(null)).toThrowError();
  });
});
