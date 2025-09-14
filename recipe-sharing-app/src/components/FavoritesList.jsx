import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  );

  if (!favorites || favorites.length === 0) {
    return <p>No favorites yet. Add some!</p>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>My Favorites</h2>
      {favorites.map(recipe => (
        recipe ? (
          <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default FavoritesList;
