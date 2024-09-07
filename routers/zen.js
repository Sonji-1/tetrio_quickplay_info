const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
  try {
    const zenInfo = await tetrioAPI.fetchZenInfo(req.params.username);
    res.json(zenInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;