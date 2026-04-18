const express = require('express');
const router = express.Router();
const { createGig, getGigs, deleteGig } = require('../controllers/gigController');

router.post('/', createGig);
router.get('/', getGigs);
router.delete('/:id', deleteGig);

module.exports = router;