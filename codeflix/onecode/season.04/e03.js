const http = require('http')
const https = require('https')
const fs = require('fs')

if (!process.argv[2])
    throw "You need to provide server PORT in argument"

const PORT = process.argv[2]
const REDDIT_JSON = 'https://www.reddit.com/r/perfectloops.json'
const MIN_TIME = 60000 // 1 minute

// Init messages at server start (avoid to read file at every request)
let savedJSON = []
let lastDataUpdate = 0

const htmlPage = fs.readFileSync('./top10Gif.html').toString();
const htmlGif = fs.readFileSync('./gif.html').toString();

http.createServer(function (req, res) {
    const actualTime = new Date().getTime()

    if (actualTime - lastDataUpdate > MIN_TIME) {
        lastDataUpdate = actualTime
        updateRedditData(() => { sendHTMLPageWithGifs(res) })
    } else {
        sendHTMLPageWithGifs(res)
    }
}).listen(PORT, () => {
    updateRedditData(() => {}) // Init data
    lastDataUpdate = new Date().getTime()
})

function updateRedditData(callback) {
    https.get(REDDIT_JSON, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            savedJSON = JSON.parse(data).data.children
            callback()
        });
    }).on("error", (err) => {
        // Throw error only if there is no local saved data
        if (err && savedJSON.length == 0)
            throw err
        callback()
    });
}

function sendHTMLPageWithGifs(res) {
    if (savedJSON.length == 0) {
        sendResponse(res, 500, 'text/plain', "No data");
        return;
    }

    let listGifHTML = []
    // Sort by gif creation desc
    savedJSON = savedJSON.sort((a, b) => {
        if (a.data.created_utc == b.data.created_utc) return 0
        if (a.data.created_utc > b.data.created_utc) return -1
        else return -1
    })
    let nbrGif = 0
    for (let gif of savedJSON) {
        if (nbrGif < 10)
            try {
                const title = gif.data.title
                const gifUrl = gif.data.preview.images[0].variants.gif.source.url
                const gifWidth = gif.data.preview.images[0].variants.gif.source.width
                const gifRedditUrl = gif.data.permalink
                listGifHTML.push(
                    htmlGif.replace(/%%gif_src%%/g, gifUrl)
                        .replace(/%%gif_title%%/g, title)
                        .replace(/%%gif_width%%/g, gifWidth)
                        .replace(/%%gif_reddit_link%%/g, "https://www.reddit.com" + gifRedditUrl)
                )
                nbrGif++
            } catch (_) { }
    }
    sendResponse(res, 200, 'text/html', htmlPage.replace('%%gif_list%%', listGifHTML.join('\n')));
}

function sendResponse(res, status, contentType, data) {
    res.writeHead(status, { 'Content-Type': contentType })
    res.write(data)
    res.end()
}