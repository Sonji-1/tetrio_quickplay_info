const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
  try {
    const quickPlayInfo = await tetrioAPI.fetchQuickPlayInfo(req.params.username);
    res.json(quickPlayInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;