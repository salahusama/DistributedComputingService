const Level = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
}

class Logger {
    constructor(component = '') {
        this.component = component
        this.log = this.log.bind(this)
    }

    info(msg) {
        this.log(Level.INFO, msg)
    }

    warn(msg) {
        this.log(Level.WARN, msg)
    }

    error(msg) {
        this.log(Level.ERROR, msg)
    }

    log(level, msg) {
        console.log(`[${level}] ${this.component}: ${msg}`)
    }
}

module.exports = Logger
