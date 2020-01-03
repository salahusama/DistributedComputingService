// By having certain libraries imported, they can be used by sent comamnds
// We can support the main required libraries and document them for our customers to use
// eslint-disable-next-line no-unused-vars
const axios = require('axios')

const WebSocket = require('ws')
const socket = new WebSocket('ws://127.0.0.1:8081')

// This is an example of a command that would work with axios imported
// eval('axios.get('https://mai-youth-be.herokuapp.com/articles').then(console.log).catch(console.error)')

socket.onopen = () => console.log('Connection is open ...')
socket.onclose = () => console.log('Connection is closed.')
socket.onerror = (err) => console.log('err: ', err)

socket.onmessage = (event) => {
    console.log('Received a message from the server...')
    handleServerMessage(event.data)
}

function handleServerMessage(data) {
    const msgObj = JSON.parse(data)
    eval(msgObj.task)
}
