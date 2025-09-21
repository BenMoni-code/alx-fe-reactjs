# GitHub User Search Application

A React-based web application that allows users to search for GitHub profiles using the GitHub API.

## Project Setup

This project was created using Vite and React template as specified in the requirements.

### Prerequisites

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BenMoni-code/alx-fe-reactjs.git
   cd alx-fe-reactjs/github-user-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Axios for API requests:
   ```bash
   npm install axios
   ```

4. Set up environment variables (optional):
   Create a `.env` file in the root directory:
   ```
   VITE_APP_GITHUB_API_KEY=your_github_personal_access_token_here
   ```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Project Structure

```
github-user-search/
├── src/
│   ├── components/          # React components
│   │   ├── Search.jsx      # Search component
│   │   └── UserCard.jsx    # User card component
│   ├── services/           # API services
│   │   └── githubService.js # GitHub API integration
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   └── main.jsx          # Application entry point
├── .env                   # Environment variables
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

### Features

- Search GitHub users by username
- Display user profile information
- Responsive design
- Error handling for API requests

### Technologies Used

- React 18
- Vite (build tool)
- Axios (HTTP client)
- GitHub REST API
- CSS3

### Repository Information

- Repository: alx-fe-reactjs
- Directory: github-user-search
- Created with: Vite React template
- Package manager: npm
