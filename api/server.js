// build your server here and require it from index.js
const express = require('express');

const server = express();
server.use(express.json())

server.get('/', (req, res) => res.send('hi!'))

const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');

server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err)
})

module.exports = server;