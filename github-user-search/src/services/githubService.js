import axios from 'axios';

// GitHub API base URL
const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

// GitHub API key (optional, for higher rate limits)
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create axios instance with default configuration
const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: 10000,
});

// Add request interceptor to include auth token if available
githubAPI.interceptors.request.use((config) => {
  if (GITHUB_API_KEY) {
    config.headers.Authorization = `token ${GITHUB_API_KEY}`;
  }
  return config;
});

// GitHub service functions
export const githubService = {
  /**
   * Search for GitHub users
   * @param {string} username - GitHub username to search for
   * @param {object} options - Additional search options
   * @returns {Promise} Promise that resolves to user data
   */
  async searchUsers(username, options = {}) {
    try {
      const { location, minRepos, maxRepos } = options;
      let query = username;
      
      // Add location filter if provided
      if (location) {
        query += ` location:${location}`;
      }
      
      // Add repository count filters if provided
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

  /**
   * Get detailed information about a specific user
   * @param {string} username - GitHub username
   * @returns {Promise} Promise that resolves to detailed user data
   */
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
