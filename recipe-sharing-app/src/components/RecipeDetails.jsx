import { useRecipeStore } from './recipeStore';
import { useParams, useNavigate } from 'react-router-dom';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back to All Recipes
      </button>

      {!isEditing ? (
        <div>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>{recipe.title}</h1>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {recipe.description}
          </p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Edit Recipe
            </button>
            <DeleteRecipeButton 
              recipeId={recipe.id} 
              onDelete={() => navigate('/')}
            />
          </div>
        </div>
      ) : (
        <EditRecipeForm 
          recipe={recipe} 
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
