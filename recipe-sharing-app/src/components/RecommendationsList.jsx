import { useRecipeStore } from './recipeStore';
import { useEffect } from 'react';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations yet. Add some favorites to get suggestions!</p>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Recommended for You</h2>
      {recommendations.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;

