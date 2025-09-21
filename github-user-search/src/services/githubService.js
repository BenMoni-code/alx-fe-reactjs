import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: 10000,
});

githubAPI.interceptors.request.use((config) => {
  if (GITHUB_API_KEY) {
    config.headers.Authorization = `token ${GITHUB_API_KEY}`;
  }
  return config;
});

export const githubService = {
  /**
   * Fetch user data from GitHub API
   * @param {string} username - GitHub username to search for
   * @returns {Promise} Promise that resolves to user data
   */
  async fetchUserData(username) {
    try {
      const response = await githubAPI.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  },

  async searchUsers(username, options = {}) {
    try {
      const { location, minRepos, maxRepos } = options;
      let query = username;
      
      if (location) {
        query += ` location:${location}`;
      }
      
      if (minRepos) {
        query += ` repos:>=${minRepos}`;
      }
      if (maxRepos) {
        query += ` repos:<=${maxRepos}`;
      }

      const response = await githubAPI.get('/search/users', {
        params: {
          q: query,
          sort: 'repositories',
          order: 'desc'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  async getUserDetails(username) {
    try {
      const response = await githubAPI.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(`Failed to fetch user details: ${error.message}`);
    }
  }
};

export default githubService;
