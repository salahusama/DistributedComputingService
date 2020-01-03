const { Server } = require('ws')
const Logger = require('../utils/logger')

const log = new Logger('ClientManager')
const clients = []
let lastSentToClientIndex = 0

/**
 * Starts a server socket to allow clients to connect.
 * Once a client attempts to connect, initial checks need to pass before the client is added to a list of discoverd clients.
 * If checks are not successful, the client connection is closed.
 */
function start() {
    // TODO: Add startup logic here
    log.info('Starting...')
    const serverSocket = new Server({ port: 8081 })
    serverSocket.on('connection', client => {
        log.info('Client attempted to connect...')

        client.onclose = () => {
            log.warn('Connection to client is closed.')
        }

        // Initial checks before adding a client
        if (!isClientSuitable(client)) {
            log.warn('Client not suitable - closing connection.')
            client.close()
            return
        }

        // After initial checks, add the socket (client connection) to the list of discoved clients
        // TODO: Add a wrapper around the client with metadata (ex: no. of failed sends, etc)
        // We can use this to determine if a client connection needs to be closed / blacklisted
        // TODO: Update a database with client statistics
        log.info('Client suitable - adding client.')
        clients.push(client)
    })
}

/**
 * Sends a command to N {@link clients} according to the number of {@link runTimes} requested.
 * In case there are less clients than requested {@link runTimes},
 * the command will be sent to the same clients multiple times.
 * 
 * @param command 
 * @param runTimes 
 * @throws {Error}
 */
function sendCommand(command, runTimes) {
    if (!clients.length) {
        log.error('Not enough clients. Client count: ' + clients.length)
        throw new Error('Not enough clients. Client count: ' + clients.length)
    }

    for (let i = 0; i < runTimes; i++) {
        const clientIndex = (++lastSentToClientIndex) % clients.length
        const client = clients[clientIndex]
        log.info(`Sending command to client (${i + 1} / ${runTimes})...`)
        client.send(JSON.stringify({
            task: command,
        }))
    }

    log.info('Command sent to all clients.')
}

/**
 * Determines whether a client is suitable or not.
 * We can check if a client is blacklisted, etc.
 * 
 * @param client 
 */
// eslint-disable-next-line no-unused-vars
function isClientSuitable(client) {
    // TODO: Check client status or other client metrics 
    return true
}

module.exports = {
    start,
    sendCommand,
}
