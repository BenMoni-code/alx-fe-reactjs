# GitHub User Search Application

A React-based web application that allows users to search for GitHub profiles using the GitHub API.

## Features

- **Search Component**: Form with input field for entering GitHub usernames
- **API Integration**: Fetches user data from GitHub API endpoint: `https://api.github.com/users/{username}`
- **State Management**: Handles input value and form submission
- **Conditional Rendering**: 
  - Loading state: "Loading..."
  - Error state: "Looks like we cant find the user"
  - Success state: User avatar, name, and GitHub profile link
- **User Information Display**: Avatar, name, bio, stats, location, and profile link
- **Responsive Design**: Works on desktop and mobile devices

## Implementation Details

### Step 1: Search Component
- Created `Search` component with form and input field
- Implemented state handling for input value and form submission
- Added proper form validation

### Step 2: API Integration
- Created `githubService.js` in services directory
- Implemented `fetchUserData` function using Axios
- Configured GitHub API endpoint: `https://api.github.com/users/{username}`
- Added error handling and timeout configuration

### Step 3: Results Display
- Modified Search component to display user information
- Implemented conditional rendering based on API call state
- Added user avatar, name, and GitHub profile link
- Included comprehensive user statistics

## Technologies Used

- React 18
- Vite (build tool)
- Axios (HTTP client)
- GitHub REST API
- CSS3 (responsive design)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/BenMoni-code/alx-fe-reactjs.git
   cd alx-fe-reactjs/github-user-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser at `http://localhost:5173`

## API Usage

The application uses the GitHub REST API:
- **Endpoint**: `https://api.github.com/users/{username}`
- **Rate Limit**: 60 requests per hour (unauthenticated)
- **Higher Limits**: Use GitHub Personal Access Token (5000 requests/hour)

## Directory Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   └── Search.jsx          # Search component with form and results
│   ├── services/
│   │   └── githubService.js    # GitHub API integration with fetchUserData
│   ├── App.jsx                 # Main application component
│   └── App.css                 # Application styles
├── .env                        # Environment variables
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Usage Examples

Search for popular GitHub users:
- `octocat` - GitHub's mascot account
- `torvalds` - Linus Torvalds
- `gaearon` - Dan Abramov (React team)
- `addyosmani` - Addy Osmani
- `sindresorhus` - Sindre Sorhus

## Repository Information

- **Repository**: alx-fe-reactjs
- **Directory**: github-user-search
- **Author**: Ben Moni
- **GitHub**: https://github.com/BenMoni-code/alx-fe-reactjs
