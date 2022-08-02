// build your `/api/projects` router here
const express = require('express');
const router = express.Router();

const projMod = require('./model')
const { validateProjectShape, validateProjectId } = require('./middleware');

router.get('/', (req, res, next) => {
    projMod.getProjects()
        .then(proj => res.json(proj))
        .catch(next)
})

router.get('/:project_id', validateProjectId, (req, res, next) => {
    try {
        res.json(req.project);
    } catch(err) {
        next(err)
    }
})

router.post('/', validateProjectShape, (req, res, next) => {
    projMod.create(req.body)
        .then(proj => res.json(proj))
        .catch(next)
})

module.exports = router;