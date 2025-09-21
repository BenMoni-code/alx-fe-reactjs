# GitHub User Search Application

A React-based web application for searching GitHub users using the GitHub API with advanced filtering capabilities.

## 🚀 Live Demo

**Deployed on Vercel:** [Visit Live Application](https://github-user-search-your-domain.vercel.app)

## ✨ Features

### Basic Search
- Search GitHub users by username
- Display user avatar, name, bio, and statistics
- Direct links to GitHub profiles
- Responsive design for all devices

### Advanced Search
- Location-based filtering
- Repository count filtering  
- Programming language filtering
- Sort options (repositories, followers, join date)
- Multiple search parameters

### API Integration
- GitHub REST API integration
- Rate limiting handling
- Error handling and retry logic
- Production-optimized performance

## 🛠️ Technologies

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **GitHub API** - Data source for user information

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- GitHub account (optional, for higher API limits)

## 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/BenMoni-code/alx-fe-reactjs.git
   cd alx-fe-reactjs/github-user-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GitHub Personal Access Token (optional)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

## 🌐 Deployment to Vercel

### Step 1: Prepare Application
- ✅ Application optimized for performance
- ✅ Console logs removed
- ✅ Error handling implemented
- ✅ Images optimized with lazy loading
- ✅ .env file added to .gitignore

### Step 2: Vercel Setup
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Import project from GitHub

### Step 3: Environment Variables
Add these in Vercel dashboard under "Environment Variables":
```
VITE_APP_GITHUB_API_KEY=your_github_personal_access_token
VITE_APP_GITHUB_API_URL=https://api.github.com
```

### Step 4: Deploy
- Push changes to main branch
- Vercel automatically builds and deploys
- Monitor deployment in Vercel dashboard

### Step 5: Verify Deployment
- Test all functionalities on live URL
- Check responsiveness on various devices
- Verify API interactions work correctly

## 📁 Project Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   └── Search.jsx          # Main search component
│   ├── services/
│   │   └── githubService.js    # GitHub API integration
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Tailwind CSS imports
├── public/                     # Static assets
├── .gitignore                 # Git ignore rules
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🔑 API Usage

- **Basic Search**: `https://api.github.com/users/{username}`
- **Advanced Search**: `https://api.github.com/search/users?q={query}`
- **Rate Limits**: 60 requests/hour (unauthenticated), 5000 requests/hour (with token)

## 🎯 Usage Examples

Search for popular GitHub users:
- `octocat` - GitHub's mascot
- `torvalds` - Linus Torvalds
- `gaearon` - Dan Abramov
- `addyosmani` - Addy Osmani

Advanced search examples:
- Location: "San Francisco, CA"
- Language: "JavaScript", "Python", "Go"
- Min repositories: 5, 10, 50

## 🔒 Security & Performance

- Environment variables properly configured
- API keys secured in Vercel environment
- Error boundaries implemented
- Loading states for better UX
- Retry logic for failed requests
- Image lazy loading for performance

## 📈 Performance Optimizations

- Tailwind CSS for optimized styling
- Vite for fast builds and HMR
- Code splitting and lazy loading
- Optimized API calls with retry logic
- Production build optimizations

## 🚀 Deployment Status

- ✅ Application optimized for production
- ✅ Environment variables secured
- ✅ .env file properly ignored
- ✅ Vercel configuration complete
- ✅ Error handling implemented
- ✅ Performance optimized
- ✅ Ready for live deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- GitHub API for providing user data
- Vercel for hosting and deployment
- React team for the framework
- Tailwind CSS for styling utilities

---

**Repository**: alx-fe-reactjs  
**Directory**: github-user-search  
**Author**: Ben Moni  
**Live Demo**: [Vercel Deployment](https://github-user-search-your-domain.vercel.app)
