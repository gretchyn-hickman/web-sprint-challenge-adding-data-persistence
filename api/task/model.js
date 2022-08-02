// build your `Task` model here
const db = require('../../data/dbConfig')

const checkComplete = (task, sect) => {
    if(task[sect] === 1)
        return {...task, [sect]: true}
    else return {...task, [sect]: false}
}

const arrCheckComp = (arr, sect) => {
    return arr.map(tsk => {
        return checkComplete(tsk, sect)
    })
}

const getTasks = (task_id) => {
    if(task_id)
        return db('tasks as tsk')
            .leftJoin('projects as pro', 'tsk.project_id', 'pro.project_id')
            .select('tsk.*', 'pro.project_name', 'pro.project_description')
            .where('task_id', task_id)
            .first()
            .then(tsk => checkComplete(tsk, 'task_completed'))
    else 
        return db('tasks as tsk')
            .leftJoin('projects as pro', 'tsk.project_id', 'pro.project_id')
            .select('tsk.*', 'pro.project_name', 'pro.project_description')
            .then(tsks => arrCheckComp(tsks, 'task_completed'))
}

const create = (task) => {
    return db('tasks')
        .insert(task)
        .then(arrId => getTasks(arrId[0]))
}

module.exports = {
    getTasks,
    create
}