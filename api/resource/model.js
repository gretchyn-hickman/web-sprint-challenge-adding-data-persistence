// build your `Resource` model here
const db = require('../../data/dbConfig');

const getResources = (id) => {
    if(id) {
        return db('resources')
            .where('resource_id', id)
            .first()
    } else {
        return db('resources')
    }
}

const create = (resource) => {
    return db('resources')
        .insert(resource)
        .then(resId => getResources(resId[0]))
}

module.exports = {
    getResources,
    create
}