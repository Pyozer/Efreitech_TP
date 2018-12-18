export const hamming = (seq1, seq2) => {
    if (typeof seq1 != "string" || typeof seq2 != "string")
        throw new Error("Sequence should be a string")

    if (seq1.length != seq2.length)
        throw new Error("Sequence should be same size")

    const seqA = seq1.toUpperCase()
    const seqB = seq2.toUpperCase()

    if (!validSequence(seqA) || !validSequence(seqB))
        throw new Error('Letters should be A, T, C or G')

    let diff = 0
    for (let i = 0; i < seqA.length; i++) {
        if (seqA[i] != seqB[i])
            diff++
    }
    return diff
}

export const toRna = (seq) => {
    if (typeof seq != "string")
        throw new Error("Sequence should be a string")

    const sequence = seq.toUpperCase()

    if (!validSequence(sequence))
        throw new Error('Invalid input DNA.')

    const transcription = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U'
    }

    let rna = ''
    for (const c of sequence)
        rna += transcription[c]

    return rna
}

function validSequence(sequence) {
    if (sequence == "") return true
    const regex = /[^ACTG]/i            // All, but exclude ATCG
    return !regex.test(sequence)
}