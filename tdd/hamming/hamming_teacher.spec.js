import { hamming } from './hamming';

describe('Hamming', () => {
  test('no difference between empty strands', () => {
    expect(hamming('', '')).toEqual(0);
  });

  test('no difference between identical strands', () => {
    expect(hamming('A', 'A')).toEqual(0);
  });

  test('long identical strands', () => {
    expect(hamming('GGACTGA', 'GGACTGA')).toEqual(0);
  });

  test('complete distance in single nucleotide strands', () => {
    expect(hamming('A', 'G')).toEqual(1);
  });

  test('complete distance in small strands', () => {
    expect(hamming('AG', 'CT')).toEqual(2);
  });

  test('small distance in small strands', () => {
    expect(hamming('AT', 'CT')).toEqual(1);
  });

  test('small distance', () => {
    expect(hamming('GGACG', 'GGTCG')).toEqual(1);
  });

  test('small distance in long strands', () => {
    expect(hamming('ACCAGGG', 'ACTATGG')).toEqual(2);
  });

  test('non-unique character in first strand', () => {
    expect(hamming('AAG', 'AAA')).toEqual(1);
  });

  test('non-unique character in second strand', () => {
    expect(hamming('AAA', 'AAG')).toEqual(1);
  });

  test('same nucleotides in different positions', () => {
    expect(hamming('TAG', 'GAT')).toEqual(2);
  });

  test('large distance', () => {
    expect(hamming('GATACA', 'GCATAA')).toEqual(4);
  });

  test('large distance in off-by-one strand', () => {
    expect(hamming('GGACGGATTCTG', 'AGGACGGATTCT')).toEqual(9);
  });

  test('disallow first strand longer', () => {
    expect(() => hamming('AATG', 'AAA')).toThrow(
      new Error("Sequence should be same size"),
    );
  });

  ['B', 'U', 'Z'].forEach(function(letter) {
    test(`disallow invalid letter: ${letter}`, () => {
      expect(() => hamming(`AA${letter}`, 'AAA')).toThrow(
        new Error("Letters should be A, T, C or G"),
      );
    });
  });

  test('disallow second strand longer', () => {
    expect(() => hamming('ATA', 'AGTG')).toThrow(
      new Error("Sequence should be same size"),
    );
  });
});