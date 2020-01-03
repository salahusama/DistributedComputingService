# Distributed Computing Service

The idea is to allow users to submit tasks (runnable code) that will be run on N clients. This is intended as a very basic (functional) prototype.

## The Server

The Server for the distributed computing prototype.

### Running the server

To run the server, simply run:
```
cd server
npm install
npm start
```

## The Client

The client for the distributed computing prototype. Multiple clients can connect to the server at the same time.

### Running a client

To run the client, the server needs to be running.

Once the server is running locally, simply run:
```
cd client
npm install
npm start
```

### Submitting a task

A task consists of a command to run (in basic JavaScript) and number of times to run it. To submit a task, make a PUT request to the server:

```
curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"command": "console.log(\"Remote command test\")","runTimes": 1}' \
    "http://localhost:3000/tasks/task"
```