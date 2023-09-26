const User = require('../models/userModels')

module.exports.renderRegister = async (req, res) => {
    try {
        const register = await User.find()
    console.log(register)
    res.status(200).json(register)
    //res.render('register')
    } catch (err) {
        console.log(err)
    }
    
}

module.exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body
        const user = new User({ firstName, lastName, username, email, password, role });
        const registeredUser = await User.register(user, password);
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