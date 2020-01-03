const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const tasksRouter = require('./routes/tasks')
const TaskManager = require('./managers/TaskManager')
const ClientManager = require('./managers/ClientManager')

const PORT = process.env.PORT || 3000
const app = express()

ClientManager.start()
TaskManager.init()

app.use(cors())
app.use(bodyParser.json())
app.use('/tasks', tasksRouter)

app.get('/health', (req, res) => res.send('Ok'))

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
