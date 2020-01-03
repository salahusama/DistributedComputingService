const ClientManager = require('./ClientManager')
const Logger = require('../utils/logger')

const log = new Logger('TaskManager')

/**
 * Initializes the {@link TaskManager} with any required paramaters.
 * 
 * @param db 
 */
// eslint-disable-next-line no-unused-vars
function init(db) {
    // TODO
    log.info('Initializing...')
}

/**
 * Updates the database with the new task and calls on {@link ClientManager} to run the task on clients.
 * 
 * @param command
 * @param runTimes
 * @returns taskId
 */
function submitTask(command, runTimes) {
    // TODO: This should also update the database in the future
    log.info('Submitting task...')

    if (!command || !runTimes) {
        log.error('Invalid task subitted: ', { command, runTimes })
        return null
    }

    try {
        ClientManager.sendCommand(command, runTimes)
        // We return a dummy task id as we do not connect to a database yet
        return 'dummy-task-id'
    } catch (err) {
        return null
    }
}

module.exports = {
    init,
    submitTask,
}
