const taskMod = require('./model');
const projMod = require('../project/model')

module.exports = {
    validateTaskShape(req, res, next) {
        const { task_description, project_id } = req.body;
        if(!task_description || typeof task_description !== 'string' || task_description.trim() === '') return next({status: 400, message: 'no task description received!'});
        if(!project_id) return next({status: 400, message: 'project id required!'})
        req.task = {task_description: task_description.trim(), project_id}
        next();
    },

    async validateProjId(req, res, next) {
        const task = await projMod.getProjects(req.task.project_id)
        if(!task) return next({status: 400, message: 'invalid project id provided!'})
        next();
    }
}