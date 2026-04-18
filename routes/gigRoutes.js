const express = require('express');
const router = express.Router();
const { createGig, getGigs } = require('../controllers/gigController');

router.post('/', createGig);
router.get('/', getGigs);

module.exports = router;