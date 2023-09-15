const express = require("express");
const router  = express.Router();
//const caseController = require('../controllers/caseController')

// This is the routes for the case controller, functions in caseController.js
// The string in the .route() method is the endpoint
// would be called in POSTMAN with http://localhost:3500/cases/getall
// contected in server.js

router.route('/getall')
    .get(caseController.getAllCases)

module.exports = router