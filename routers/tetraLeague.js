const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
    try {
        const tetraLeagueInfo = await tetrioAPI.fetchTetraLeagueInfo(req.params.username);
        console.log('Tetra League API 응답:', tetraLeagueInfo); // 추가된 로그
        res.json(tetraLeagueInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;