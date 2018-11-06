const http = require('http')
const https = require('https')
const fs = require('fs')
const url = require('url')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./episode_4.db');

if (!process.argv[2])
    throw "You need to provide server PORT in argument"
if (!process.argv[3])
    throw "You need to provide a default tag to init some data"

const PORT = process.argv[2]
const INIT_TAG = process.argv[3]
const API_500PX = 'https://api.500px.com/v1'
const MIN_TIME = 60000 // 1 minute

let lastDataUpdate = 0

const htmlPage = fs.readFileSync('./e04.html').toString();

http.createServer(function (req, res) {
    const actualTime = new Date().getTime()

    const query = url.parse(req.url, true).query

    if (req.url == '/') {
        sendResponse(res, 200, 'text/html', htmlPage)
    } else if (req.url.startsWith('/search')) {
        if (!query.tag) {
            sendResponse(res, 400, 'text/plain', 'You must provide search tag !')
        } else if (actualTime - lastDataUpdate > MIN_TIME) {
            lastDataUpdate = actualTime
            fetchWithTag(query.tag, (data) => {
                if (!data)
                    sendResponse(res, 500, 'text/plain', 'Error during fetch data from 500px\'s API')
                else {
                    saveDataToDB(data, (photos) => {
                        sendResponse(res, 200, 'application/json', JSON.stringify(photos))
                    })
                }
            })
        } else {
            getDataFromDB(query.tag, (data) => {
                if (!data)
                    sendResponse(res, 500, 'text/plain', 'Error during read data from local database')
                else {
                    sendResponse(res, 200, 'application/json', JSON.stringify(data))
                }
            })
        }
    } else {
        sendResponse(res, 404, 'text/plain', 'Error 404 Page not found')
    }
}).listen(PORT, () => {
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS photo (id INT, tags TEXT, image TEXT)")
    })

    fetchWithTag(INIT_TAG, (data) => {
        if (!data)
            sendResponse(res, 500, 'text/plain', 'Error during fetch data from 500px\'s API')
        else {
            saveDataToDB(data, (photos) => {})
        }
    })
})

function fetchWithTag(tag, callback) {
    //const fetchUrl = encodeURI(API_500PX + '/photos/search?tag=' + tag)
    const fetchUrl = "https://raw.githubusercontent.com/Pyozer/Efreitech_TP/master/codeflix/onecode/season.04/api_500px_people.json?token=AQGOPmK74wOD4zH1Mtzb8QgTDgwxiXaUks5b6wpywA%3D%3D"
    https.get(fetchUrl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            callback(JSON.parse(data))
        });
    }).on("error", (err) => {
        callback(null)
    });
}

function saveDataToDB(data, callback) {
    let photos = []
    for (let photo of data.photos) {
        db.all("SELECT COUNT(*) as isInserted FROM photo WHERE id = ?", [photo.id], function (err, rows) {
            if (err) throw err

            const photoObj = {
                id: photo.id,
                tags: photo.tags.toString(),
                image: photo.images[photo.images.length - 1].url
            }

            if (rows[0].isInserted == 0) {
                db.run("INSERT INTO photo VALUES (?, ?, ?)", [photoObj.id, photoObj.tags, photoObj.image], function (errorInsert) {
                    if (errorInsert) throw errorInsert
                    photos.push(photoObj)
                    if (photos.length == data.photos.length)
                        callback(photos)
                })
            } else {
                db.run("UPDATE photo SET tags = ? AND image = ? WHERE id = ?", [photoObj.tags, photoObj.image, photoObj.id], function (errorUpdate) {
                    if (errorUpdate) throw errorUpdate
                    photos.push(photoObj)
                    if (photos.length == data.photos.length)
                        callback(photos)
                })
            }
        })
    }
}

function getDataFromDB(tag, callback) {
    db.all("SELECT * FROM photo WHERE tags LIKE ?", [`%${tag}%`], function (err, rows) {
        if (err) throw err
        let photos = []
        rows.forEach(function (row) {
            if (err) throw err
            photos.push(row)
        })
        callback(photos)
    })
}

function sendResponse(res, status, contentType, data) {
    res.writeHead(status, { 'Content-Type': contentType })
    res.write(data)
    res.end()
}