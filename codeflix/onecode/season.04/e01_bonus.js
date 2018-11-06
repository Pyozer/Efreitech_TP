const http = require('http')
const url = require('url')
const fs = require('fs')

if (!process.argv[2])
    throw "You need to provide server PORT in argument"

const PORT = process.argv[2]

let usersData = {}

const htmlPage = fs.readFileSync('./e01.html').toString()

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
        userData.number = Math.floor(Math.random() * Math.floor(1000));

    // Number that user is trying
    const queryN = url.parse(req.url, true).query.n
    let number = parseInt(queryN)

    res.writeHead(200, { 'Content-Type': 'text/html' })

    let result = ''

    // Check if user has correctly provide his number
    if (queryN) {
        if (!number) {
            result = "You must provide an integer, example: 500"
        } else {
            number = parseInt(number)
            // If the user found the number
            userData.try++
            if (userData.number == number) {
                result = `Well done! You have found in ${userData.try} shots`
                userData.try = 0
                userData.number = -1
            } else if (userData.number > number) {
                result = `It's Bigger than ${number}`
            } else {
                result = `It's Smaller than ${number}`
            }
        }
    }

    res.write(htmlPage.replace('%%result%%', result))
    res.end()
}).listen(PORT)