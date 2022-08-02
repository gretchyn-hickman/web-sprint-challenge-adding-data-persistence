// build your `Project` model here
const db = require('../../data/dbConfig')

const alterComp = (obj, key) => {
    if(obj[key] === 1)
            return {...obj, [key]: true}
        else return {...obj, [key]: false}
}

const checkCompl = (objs, key) => {
    return objs.map(obj => {
        return alterComp(obj, key)
    })
}

const getProjects = (id) => {
    if(id) {
        return db('projects')
            .where('project_id', id)
            .first()
            .then(proj => {
                if(!proj) return null
                return alterComp(proj, 'project_completed');
            })
    } else {
        return db('projects')
            .then(projs => {
               return checkCompl(projs, 'project_completed')
            })
    }
} 

const create = (proj) => {
    return db('projects')
        .insert(proj)
        .then(newId => {
            const newProj = getProjects(newId[0])
            return newProj
        })
}

module.exports = {
    getProjects,
    create
}