// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();

const taskMod = require('./model')
const { validateTaskShape, validateProjId } = require('./middleware')

router.get('/', (req, res, next) => {
    taskMod.getTasks()
        .then(tasks => res.json(tasks))
        .catch(next)
})

router.post('/', validateTaskShape, validateProjId, (req, res, next) => {
    taskMod.create(req.task)
        .then(tsk => res.json(tsk))
        .catch(next)
})

module.exports = router;