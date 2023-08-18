const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers')

router.get('/', homeControllers.renderHomePage)

router.get('/admissions', homeControllers.renderHomePageAdmissions)

router.get('/about', homeControllers.renderHomePageAboutUs)

router.get('/contact', homeControllers.renderHomePageContactUs)

module.exports = router