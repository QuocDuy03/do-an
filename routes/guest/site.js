const express = require('express');
const router = express.Router();

const siteController = require("../../controllers/guest/SiteController");

router.get('/', siteController.index);
router.get('/home', siteController.index);
router.get('/logout', siteController.logOut);

module.exports = router;