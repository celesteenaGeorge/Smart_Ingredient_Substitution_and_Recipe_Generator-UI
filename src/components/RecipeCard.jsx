import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  if (!recipe || Object.keys(recipe).length === 0) {
    return null; 
  }

  return (
    <div className="recipe-card">
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-servings">Serves: {recipe.servings}</p>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="recipe-section">
        <h3>Tips</h3>
        <ul>
          {recipe.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
