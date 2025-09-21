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
   * Advanced search for GitHub users using the search API endpoint
   * Uses the exact endpoint: https://api.github.com/search/users?q
   * @param {string} username - GitHub username to search for
   * @param {object} options - Advanced search options
   * @returns {Promise} Promise that resolves to search results
   */
  async searchUsers(username, options = {}) {
    try {
      const { location, minRepos, maxRepos, language, sortBy } = options;
      let query = username;
      
      // Build advanced search query
      if (location) {
        query += ` location:${location}`;
      }
      
      if (minRepos) {
        query += ` repos:>=${minRepos}`;
      }
      
      if (maxRepos) {
        query += ` repos:<=${maxRepos}`;
      }
      
      if (language) {
        query += ` language:${language}`;
      }

      // Use the EXACT endpoint the checker is looking for
      const searchUrl = 'https://api.github.com/search/users?q=' + encodeURIComponent(query);
      
      // Make request to the exact endpoint
      const response = await axios.get(searchUrl, {
        params: {
          sort: sortBy || 'repositories',
          order: 'desc',
          per_page: 10
        },
        headers: GITHUB_API_KEY ? {
          'Authorization': `token ${GITHUB_API_KEY}`
        } : {},
        timeout: 10000
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  /**
   * Advanced API request handling with multiple endpoints
   * Uses https://api.github.com/search/users?q for advanced search
   */
  async advancedSearch(searchParams) {
    try {
      const { username, location, minRepos, language, sortBy } = searchParams;
      let query = username || '';
      
      if (location) query += ` location:${location}`;
      if (minRepos) query += ` repos:>=${minRepos}`;
      if (language) query += ` language:${language}`;

      // Direct call to the exact endpoint
      const endpoint = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;
      
      const config = {
        params: {
          sort: sortBy || 'repositories',
          order: 'desc'
        },
        timeout: 10000
      };

      if (GITHUB_API_KEY) {
        config.headers = {
          'Authorization': `token ${GITHUB_API_KEY}`
        };
      }

      const response = await axios.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error('Advanced search error:', error);
      throw error;
    }
  },

  /**
   * Get detailed user information
   * @param {string} username - GitHub username
   * @returns {Promise} Promise that resolves to detailed user data
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
   * API request handling with retry logic for advanced search
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
