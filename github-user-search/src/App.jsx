import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            GitHub User Search
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Search for GitHub users and explore their profiles
          </p>
        </div>
      </header>
      
      <main className="py-8">
        <Search />
      </main>
    </div>
  )
}

export default App
