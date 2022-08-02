// build your `/api/resources` router here
const express = require('express');
const router = express.Router();

const resMod = require('./model')

router.get('/', (req, res, next) => {
    resMod.getResources()
        .then(resAll => res.json(resAll))
        .catch(next)
})

router.post('/', (req, res, next) => {
    resMod.create(req.body)
        .then(obj => res.json(obj))
        .catch(next);
})

module.exports = router;