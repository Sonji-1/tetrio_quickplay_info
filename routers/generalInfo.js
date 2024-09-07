const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
    try {
        const userInfo = await tetrioAPI.fetchUserInfo(req.params.username);
        console.log('사용자 정보 API 응답:', userInfo); // 추가된 로그
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
