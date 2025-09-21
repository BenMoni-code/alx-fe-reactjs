import { useState } from 'react';
import { githubService } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    setUserData(null);
    
    if (!searchTerm.trim()) {
      setError('Please enter a username to search');
      return;
    }

    setLoading(true);

    try {
      const data = await githubService.fetchUserData(searchTerm.trim());
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="search-results">
        {loading && (
          <div className="loading-message">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {userData && !loading && !error && (
          <div className="user-result">
            <div className="user-avatar">
              <img 
                src={userData.avatar_url} 
                alt={`${userData.login}'s avatar`}
                className="avatar-image"
              />
            </div>
            <div className="user-info">
              <h2 className="user-name">
                {userData.name || userData.login}
              </h2>
              <p className="username">@{userData.login}</p>
              {userData.bio && (
                <p className="user-bio">{userData.bio}</p>
              )}
              <div className="user-stats">
                <span className="stat">
                  <strong>Repositories:</strong> {userData.public_repos}
                </span>
                <span className="stat">
                  <strong>Followers:</strong> {userData.followers}
                </span>
                <span className="stat">
                  <strong>Following:</strong> {userData.following}
                </span>
              </div>
              {userData.location && (
                <p className="user-location">
                  <strong>Location:</strong> {userData.location}
                </p>
              )}
              <div className="user-actions">
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-profile-link"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
