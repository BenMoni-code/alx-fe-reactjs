import { useState } from 'react';
import { githubService } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('repositories');
  const [searchMode, setSearchMode] = useState('basic');
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
  };

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    
    setError(null);
    setUserData(null);
    setSearchResults(null);
    
    if (!searchTerm.trim()) {
      setError('Please enter a username to search');
      return;
    }

    setLoading(true);

    try {
      const data = await githubService.withRetry(() => 
        githubService.fetchUserData(searchTerm.trim())
      );
      setUserData(data);
      setSearchMode('basic');
    } catch (err) {
      setError(err.message || 'Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    
    setError(null);
    setUserData(null);
    setSearchResults(null);
    
    if (!searchTerm.trim()) {
      setError('Please enter a username to search');
      return;
    }

    setLoading(true);

    try {
      const searchParams = {
        username: searchTerm.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : null,
        language: language.trim(),
        sortBy: sortBy
      };
      
      const data = await githubService.withRetry(() =>
        githubService.advancedSearch(searchParams)
      );
      
      setSearchResults(data);
      setSearchMode('advanced');
    } catch (err) {
      setError(err.message || 'Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocation('');
    setMinRepos('');
    setLanguage('');
    setSortBy('repositories');
    setUserData(null);
    setSearchResults(null);
    setError(null);
    setShowAdvanced(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <form onSubmit={handleBasicSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Advanced Search Filters
          </h3>
          <form onSubmit={handleAdvancedSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location Filter
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g., San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Repositories
                </label>
                <input
                  id="minRepos"
                  type="number"
                  placeholder="e.g., 5"
                  value={minRepos}
                  onChange={(e) => setMinRepos(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Programming Language
                </label>
                <input
                  id="language"
                  type="text"
                  placeholder="e.g., JavaScript, Python"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Results By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="repositories">Most Repositories</option>
                  <option value="followers">Most Followers</option>
                  <option value="joined">Recently Joined</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                disabled={loading || !searchTerm.trim()}
              >
                Advanced Search
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                disabled={loading}
              >
                Reset All Filters
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium text-blue-600">Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium">
              {error}
            </div>
          </div>
        )}

        {userData && !loading && !error && searchMode === 'basic' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={userData.avatar_url} 
                  alt={`${userData.login}'s avatar`}
                  className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {userData.name || userData.login}
                </h2>
                <p className="text-lg text-gray-600 mb-3">@{userData.login}</p>
                {userData.bio && (
                  <p className="text-gray-700 mb-4 leading-relaxed">{userData.bio}</p>
                )}
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{userData.public_repos}</div>
                    <div className="text-sm text-blue-600 font-medium">Repositories</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{userData.followers}</div>
                    <div className="text-sm text-green-600 font-medium">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{userData.following}</div>
                    <div className="text-sm text-purple-600 font-medium">Following</div>
                  </div>
                </div>

                {userData.location && (
                  <p className="text-gray-600 mb-4 flex items-center">
                    <span className="font-medium mr-2">📍 Location:</span> 
                    <span className="bg-gray-100 px-2 py-1 rounded">{userData.location}</span>
                  </p>
                )}
                
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        )}

        {searchResults && !loading && !error && searchMode === 'advanced' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Advanced Search Results
              </h3>
              <p className="text-blue-700">
                Found {searchResults.total_count} users using advanced filters
              </p>
            </div>
            
            {searchResults.items && searchResults.items.map((user) => (
              <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full border-2 border-gray-200 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {user.name || user.login}
                    </h4>
                    <p className="text-gray-600 mb-2">@{user.login}</p>
                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Repos: {user.public_repos || 'N/A'}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        Followers: {user.followers || 'N/A'}
                      </span>
                    </div>
                    <a 
                      href={user.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Profile
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
