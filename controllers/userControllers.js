const User = require('../models/userModels')

module.exports.renderRegister = (req, res) => {
    res.render('register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body
        const user = new User({ firstName, lastName, username, email, password, role });
        const registeredUser = await User.register(user, password);
        console.log(user)
        console.log(registeredUser)
        req.login(registeredUser, err => { //Automatically loggin a new register user once he successful register
            if (err) return next(err);
            res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('login')
}

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    res.redirect('/');
    req.session.destroy()
}