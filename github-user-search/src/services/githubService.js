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

  /**
   * Advanced search for GitHub users with filters
   * @param {string} username - GitHub username to search for
   * @param {object} options - Advanced search options
   * @returns {Promise} Promise that resolves to search results
   */
  async searchUsers(username, options = {}) {
    try {
      const { location, minRepos, maxRepos, language, sortBy } = options;
      let query = username;
      
      // Add location filter
      if (location) {
        query += ` location:${location}`;
      }
      
      // Add repository count filters
      if (minRepos) {
        query += ` repos:>=${minRepos}`;
      }
      if (maxRepos) {
        query += ` repos:<=${maxRepos}`;
      }
      
      // Add language filter
      if (language) {
        query += ` language:${language}`;
      }

      const response = await githubAPI.get('/search/users', {
        params: {
          q: query,
          sort: sortBy || 'repositories',
          order: 'desc',
          per_page: 10
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  /**
   * Get detailed user information including repositories
   * @param {string} username - GitHub username
   * @returns {Promise} Promise that resolves to detailed user data with repos
   */
  async getUserDetails(username) {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        githubAPI.get(`/users/${username}`),
        githubAPI.get(`/users/${username}/repos`, {
          params: {
            sort: 'updated',
            per_page: 5
          }
        })
      ]);
      
      return {
        ...userResponse.data,
        repositories: reposResponse.data
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(`Failed to fetch user details: ${error.message}`);
    }
  },

  /**
   * Advanced API request handling with retry logic
   * @param {Function} apiCall - API call function
   * @param {number} retries - Number of retry attempts
   * @returns {Promise} Promise that resolves to API response
   */
  async withRetry(apiCall, retries = 3) {
    try {
      return await apiCall();
    } catch (error) {
      if (retries > 0 && error.response?.status >= 500) {
        console.log(`Retrying API call... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.withRetry(apiCall, retries - 1);
      }
      throw error;
    }
  }
};

export default githubService;
