import { hamming, toRna } from './hamming'

class HammingTest {
    constructor(seq1, seq2, result, exception) {
        this.seq1 = seq1
        this.seq2 = seq2
        this.result = result
        this.exception = exception
    }
}

describe("Hamming", () => {
    const values = [
        new HammingTest('AA', 'AA', 0),
        new HammingTest(
            'TGACCCGTTATGCTCGAGTTCGGTCAGAGCGTCATTGCGAGTAGTCGTTTGCTTTCTCAAACTCC',
            'GAGCGATTAAGCGTGACAGCCCCAGGGAACCCACAAAACGTGATCGCAGTCCATCCGATCATACA',
            50
        ),
        new HammingTest(
            'TGACCCGTTATGCTCGAGTTCGGTCAGAGCGTCATTGCGAGTAGTCGTTTGCTTTCTCAAACTCCGAGCGATTAAGCGTGACAGCCCCAGGGAACCCACAAAACGTGATCGCAGTCCATCCGATCATACA',
            'GAGCGATTAAGCGTGACAGCCCCAGGGAACCCACAAAACGTGATCGCAGTCCATCCGATCATACATGACCCGTTATGCTCGAGTTCGGTCAGAGCGTCATTGCGAGTAGTCGTTTGCTTTCTCAAACTCC',
            100
        ),
        new HammingTest('TAACTC', 'CATACA', 5),
        new HammingTest('ACTG', 'GTCA', 4),
        new HammingTest('aCtGTca', 'AcTgTCA', 0),
        new HammingTest('ACTGB', 'ACTGB', null, Error),
        new HammingTest('ACTGBGACTG', 'ACTGB', null, Error),
        new HammingTest(23, 'ACTG', null, Error),
        new HammingTest('ATCG', 23, null, Error),
    ]

    values.forEach(({ seq1, seq2, result, exception }) => {
        if (exception)
            test(`Pass '${seq1}' and '${seq2}' and should throw an exception`, () => {
                expect(() => hamming(seq1, seq2)).toThrow()
            })
        else
            test(`Pass '${seq1}' and '${seq2}' and should return '${result}`, () => {
                expect(hamming(seq1, seq2)).toEqual(result)
            })
    })

})

describe("RNA", () => {
    test(`Pass 'ACGTGGTCTTAA' and should return 'UGCACCAGAAUU`, () => {
        expect(toRna('ACGTGGTCTTAA')).toEqual('UGCACCAGAAUU')
    })

    test(`Pass 'UGCACCAGAAUU' and should throw an Error`, () => {
        expect(() => toRna('UGCACCAGAAUU')).toThrow()
    })

    test(`Pass 'U' and should throw an Error`, () => {
        expect(() => toRna('U')).toThrow()
    })

    test(`Pass 'ACGTXXXCTTAA' and should throw an Error`, () => {
        expect(() => toRna('U')).toThrow()
    })

    test(`Pass 25 and should throw an Error`, () => {
        expect(() => toRna(25)).toThrow()
    })

})