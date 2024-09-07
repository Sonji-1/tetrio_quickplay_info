const express = require('express');
const router = express.Router();
const tetrioAPI = require('../lib/tetrio-api');

router.get('/:username', async (req, res) => {
    console.log(`유저 정보 요청: ${req.params.username}`); // 요청 로그 추가
    try {
        const userInfo = await tetrioAPI.fetchUserInfo(req.params.username);
        res.json(userInfo);
    } catch (error) {
        console.error('라우터 오류:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;