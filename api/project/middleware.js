const projMod = require('./model')

module.exports = {
    validateProjectShape(req, res, next) {
        const {project_name} = req.body;
        if(!project_name) return next({status: 400, message: "project name is missing!"})
        next();
    },

    async validateProjectId(req, res, next) {
        const { project_id } = req.body;
        const proj = await projMod.getProjects(project_id)
        if(!proj) return next({status: 404, message: 'no project by that id!'})
        req.project = proj;
        next();
    }
}