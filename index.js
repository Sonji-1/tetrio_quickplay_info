const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const BASE_URL = 'https://ch.tetr.io/api';

app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        res.set('Content-Type', 'text/html; charset=utf-8');
    }
}));

async function getUserInfo(username) {
  try {
    console.log(`Fetching data for user: ${username}`);
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        'User-Agent': 'TETR.IO API Test Client'
      }
    });
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.success === true && response.data.data) {
      const userData = response.data.data;
      console.log('User data structure:', JSON.stringify(userData, null, 2));
      
      const userInfo = {
        username: userData.username || '-',
        country: userData.country || '-',
        joinDate: userData.ts ? new Date(userData.ts).toLocaleDateString() : '-',
        gamesPlayed: userData.gamesplayed !== undefined ? userData.gamesplayed.toLocaleString() : '-',
        gameTime: userData.gametime !== undefined ? Math.round(userData.gametime / 3600) + ' 시간' : '-',
        rating: '-', // API 응답에 rating 정보가 없어 보입니다.
        rank: '-', // API 응답에 rank 정보가 없어 보입니다.
        apm: '-', // API 응답에 apm 정보가 없어 보입니다.
        pps: '-', // API 응답에 pps 정보가 없어 보입니다.
        vs: '-', // API 응답에 vs 정보가 없어 보입니다.
        xp: userData.xp !== undefined ? userData.xp.toLocaleString() : '-',
        gamesWon: userData.gameswon !== undefined ? userData.gameswon.toLocaleString() : '-',
        friendCount: userData.friend_count !== undefined ? userData.friend_count.toLocaleString() : '-'
      };
      console.log('Processed user info:', JSON.stringify(userInfo, null, 2));
      return userInfo;
    } else {
      console.log('API Response structure:', JSON.stringify(response.data, null, 2));
      throw new Error('User data not found or invalid');
    }
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    throw error;
  }
}

app.get('/api/user/:username', async (req, res) => {
  console.log(`Received request for user: ${req.params.username}`);
  try {
    const userInfo = await getUserInfo(req.params.username);
    console.log(`Successfully retrieved info for user: ${req.params.username}`);
    console.log('User info being sent to client:', JSON.stringify(userInfo, null, 2));
    res.json(userInfo);
  } catch (error) {
    console.error(`Error retrieving info for user ${req.params.username}:`, error);
    res.status(200).json({ 
      error: `Failed to retrieve user data: ${error.message}`,
      details: error.response?.data || 'No additional details available'
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});