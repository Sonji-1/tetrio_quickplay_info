const axios = require('axios');

const BASE_URL = 'https://ch.tetr.io/api';

class TetrioAPI {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'User-Agent': 'TETR.IO API Test Client'
      }
    });
  }

  async fetchUserInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}`); // 사용자 정보
      return response.data;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error.message);
      throw error;
    }
  }

  async fetch40LinesInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/summaries/40l`); // 40 Lines 정보
      return response.data.data;
    } catch (error) {
      console.error('40 Lines 정보 가져오기 오류:', error.message);
      throw error;
    }
  }

  async fetchBlitzInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/summaries/blitz`); // Blitz 정보
      return response.data.data;
    } catch (error) {
      console.error('Blitz 정보 가져오기 오류:', error.message);
      throw error;
    }
  }

  async fetchZenInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/summaries/zen`); // Zen 정보
      return response.data.data;
    } catch (error) {
      console.error('Zen 정보 가져오기 오류:', error.message);
      throw error;
    }
  }

  async fetchTetraLeagueInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/summaries/league`); // Tetra League 정보
      return response.data.data;
    } catch (error) {
      console.error('Tetra League 정보 가져오기 오류:', error.message);
      throw error;
    }
  }

  async fetchQuickPlayInfo(username) {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/summaries/zenith`); // Quick Play 정보
      return response.data.data;
    } catch (error) {
      console.error('Quick Play 정보 가져오기 오류:', error.message);
      throw error;
    }
  }
}

module.exports = new TetrioAPI();