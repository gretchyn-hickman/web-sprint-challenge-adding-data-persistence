const resMod = require('./model')

module.exports = {
    async validateUniqueResources(req, res, next) {
        const resource = await resMod.getResources(req.params.resource_id);
        if(resource.resource_name) return next({status: 404, message: 'resource name already in use!'});
        next();
    }
}