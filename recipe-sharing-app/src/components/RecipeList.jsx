import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes);

  if (!recipes || recipes.length === 0) {
    return <p>No recipes found. Try adding one or adjusting your search.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {recipes.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description.slice(0, 80)}...</p>
          <Link to={`/recipe/${recipe.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
