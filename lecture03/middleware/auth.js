const authChecker = (req, res, next) => {
    if(req.get('role') === 'admin') {
        next();
    } else {
        res.status(403).render('error', {title: '403 Forbidden', msg: "You're not allowed here!"})
    }
}

module.exports = {
    authChecker
}