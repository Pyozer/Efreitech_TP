module.exports = function (filename) {
    let values = filename.split('.')
    if (values.length < 2)
        return ""
    return "." + values[values.length - 1]
}