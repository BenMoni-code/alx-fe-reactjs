const UserCard = ({ user }) => {
  const {
    login,
    avatar_url,
    html_url,
    name,
    bio,
    public_repos,
    followers,
    following,
    location
  } = user;

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img 
          src={avatar_url} 
          alt={`${login}'s avatar`}
          className="avatar-image"
        />
      </div>
      
      <div className="user-info">
        <h2 className="user-name">{name || login}</h2>
        <a 
          href={html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          @{login}
        </a>

        {bio && <p className="user-bio">{bio}</p>}

        <div className="user-stats">
          <span>Repos: {public_repos}</span>
          <span>Followers: {followers}</span>
          <span>Following: {following}</span>
        </div>

        {location && <p>Location: {location}</p>}

        <a 
          href={html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-profile-button"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
