const http = require('http')
const url = require('url')

if (!process.argv[2])
    throw "You need to provide server PORT in argument"

const PORT = process.argv[2]

let usersData = {}

http.createServer(function (req, res) {
    // Get user ip to store number and trys individually
    const userIp = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    // Init number and user try if necessary
    if (!usersData[userIp])
        usersData[userIp] = { number: -1, try: 0 }

    const userData = usersData[userIp]

    if (userData.number == -1)
        userData.number = Math.floor(Math.random() * 1000);

    // Number that user is trying
    const queryN = url.parse(req.url, true).query.n
    const number = parseInt(queryN)

    res.writeHead(200, { 'Content-Type': 'text/plain' })

    // Check if user has correctly provide his number
    if (!queryN || !number) {
        res.write("You must provide an integer in 'n' parameter of the url, example: /?n=500")
    } else {
        // If the user found the number
        userData.try++
        if (userData.number == number) {
            res.write(`Well done! You have found in ${userData.try} shots`)
            userData.try = 0
            userData.number = -1
        } else if (userData.number > number) {
            res.write(`Bigger`)
        } else {
            res.write(`Smaller`)
        }
    }
    res.end()
}).listen(PORT)