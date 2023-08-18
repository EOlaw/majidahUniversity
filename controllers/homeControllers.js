module.exports.renderHomePage = (req, res) => {
    res.render('homepage/homepage')
}

module.exports.renderHomePageAdmissions = (req, res) => {
    res.render('homepage/admissions')
}

module.exports.renderHomePageAboutUs = (req, res) => {
    res.render('homepage/about')
}

module.exports.renderHomePageContactUs = (req, res) => {
    res.render('homepage/contact')
}