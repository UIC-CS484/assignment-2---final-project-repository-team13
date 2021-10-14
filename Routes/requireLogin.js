module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({error: 'unauthenticated'})
    }
    next();
}