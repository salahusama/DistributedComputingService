const router = require('express').Router()
const TaskManager = require('../managers/TaskManager')

// Add new task
router.put('/task', (req, res) => {
    const { command, runTimes } = req.body
    const taskId = TaskManager.submitTask(command, runTimes)

    if (!taskId) {
        return res.json({ message: 'Error submitting task.' })
    }

    res.json({ message: 'Submitted.', taskId })
})

module.exports = router
