const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Parse argument
const originArgs = process.argv.slice(2) // Get only useful args for ls
const args = []
// Transform arg -laRrp || -l -a -R -r -p || -la -Rr -p to arg list [l, a, R, r, p]
originArgs.forEach(originArg => {
    originArg.replace('-', '').split('').forEach(arg => {
        args.push(arg)
    })
})

// Arguments
const arg_l = args.includes('l') // Display long format
const arg_a = args.includes('a') // Include file starting with '.'
const arg_R = args.includes('R') // Recursively print
const arg_r = args.includes('r') // Order desc
const arg_p = args.includes('p') // Print a '/' at end if it's a directory

function parsePermission(mode) {
    const otX = mode & 1 ? 'x' : '-' // Others execution
    const otW = mode & 2 ? 'w' : '-' // Others Write
    const otR = mode & 4 ? 'r' : '-' // Others Read
    const grX = mode & 10 ? 'x' : '-' // Group Execute
    const grW = mode & 20 ? 'w' : '-' // Group Write
    const grR = mode & 40 ? 'r' : '-' // Group Read
    const owX = mode & 100 ? 'x' : '-' // Owner Execution
    const owW = mode & 200 ? 'w' : '-' // Owner Write
    const owR = mode & 400 ? 'r' : '-' // Owner Read

    return `${owR}${owW}${owX}${grR}${grW}${grX}${otR}${otW}${otX}`
}

function getPrefix(stats) {
    if (stats.isDirectory()) return 'd'
    if (stats.isCharacterDevice()) return 'c'
    if (stats.isSymbolicLink()) return 'l'
    if (stats.isFIFO()) return 'p'
    if (stats.isSocket()) return 's'
    if (stats.isBlockDevice()) return 'b'
    return '-'
}

function lsDir(origin) {
    let files = fs.readdirSync(origin)

    if (arg_l) {
        files.unshift('..')
        files.unshift('.')
    }

    // If arg 'r', sort desc
    if (arg_r)
        files.sort((a, b) => {
            if (a < b) return 1
            if (a > b) return -1
            return 0
        })

    let total = 0
    let linesPrint = []
    files.forEach(file => {
        let filePath = path.join(origin, file)
        let stats = fs.lstatSync(filePath)

        if (!file.startsWith('.') || file.startsWith('.') && arg_a) {
            let line = file
            if (arg_l) {
                let owner = execSync(`id -nu ${stats.uid}`).toString().trim()
                let group = execSync(`cat /etc/group | grep :${stats.gid}:`).toString().split(':')[0].trim()

                const size = stats.size
                const perm = parsePermission(stats.mode)

                let prefix = getPrefix(stats)

                let subfiles = 1
                if (stats.isDirectory() || stats.isSymbolicLink())
                    subfiles = fs.readdirSync(path.join(origin, file)).length + 2 // +2 for . and ..

                const dateObj = new Date(stats.mtimeMs)
                const date = dateObj.toDateString().slice(4) + ' ' + dateObj.toTimeString().slice(0, 9)

                line = `${prefix}${perm}  ${subfiles}\t${owner}\t${group}\t${size}\t${date}\t${file}`

                if (file != '.' && file != '..')
                    total += stats.blocks
            }
            line += (arg_p && stats.isDirectory()) ? '/' : ''
            linesPrint.push(line)
        }
    })

    if (arg_l)
        console.log(`total ${total}`)
    console.log(linesPrint.join('\n'))

    if (arg_R) {
        let currentDir = __dirname
        files.forEach(file => {
            let filePath = path.join(origin, file)
            let stats = fs.lstatSync(filePath)
            if (stats.isDirectory() && file != '.' && file != '..') {
                console.log(`\n.${filePath.replace(currentDir, '')}:`)
                lsDir(filePath, true)
            }
        })
    }
}

lsDir(__dirname)