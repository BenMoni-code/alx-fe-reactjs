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

// Error handling for production
githubAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Network error. Please check your connection.');
  }
);

export const githubService = {
  async fetchUserData(username) {
    try {
      const response = await githubAPI.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchUsers(username, options = {}) {
    try {
      const { location, minRepos, maxRepos, language, sortBy } = options;
      let query = username;
      
      if (location) query += ` location:${location}`;
      if (minRepos) query += ` repos:>=${minRepos}`;
      if (maxRepos) query += ` repos:<=${maxRepos}`;
      if (language) query += ` language:${language}`;

      const searchUrl = 'https://api.github.com/search/users?q=' + encodeURIComponent(query);
      
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
      throw error;
    }
  },

  async advancedSearch(searchParams) {
    try {
      const { username, location, minRepos, language, sortBy } = searchParams;
      let query = username || '';
      
      if (location) query += ` location:${location}`;
      if (minRepos) query += ` repos:>=${minRepos}`;
      if (language) query += ` language:${language}`;

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
      throw error;
    }
  },

  async withRetry(apiCall, retries = 3) {
    try {
      return await apiCall();
    } catch (error) {
      if (retries > 0 && error.response?.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.withRetry(apiCall, retries - 1);
      }
      throw error;
    }
  }
};

export default githubService;
