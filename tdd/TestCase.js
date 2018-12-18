export default class TestCase {
    constructor(input, output, desc) {
        this.input = input
        this.output = output
        this.desc = desc || `Pass ${input} and should return ${output}`
    }
}