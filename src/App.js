import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const YOUR_APP_ID = '9d468a34';
  const YOUR_APP_KEY = '7813a876081e543ab5612aea5ad2fa6a';

  const searchRecipes = async () => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    try {
      const result = await axios.get(url);
      setRecipes(result.data.hits);
    } catch (error) {
      console.error("Error fetching the recipes", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="navbar-brand">Food Recipe Finder</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for a recipe"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </nav>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p><strong>Calories:</strong> {Math.round(recipe.recipe.calories)} kcal</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.recipe.ingredientLines.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Instructions:</strong></p>
            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
              View Recipe Instructions
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
