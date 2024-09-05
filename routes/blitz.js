const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
  try {
    const blitzInfo = await tetrioAPI.fetchBlitzInfo(req.params.username);
    res.json(blitzInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;