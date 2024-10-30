import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Logger from '../../utils/logger/logger';

interface Recipe {
  id: number;
  name: string;
  description: string;
}

interface Filter {
  ingredients: string;
  keywords: string;
  limit: number;
}

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<Filter>({
    ingredients: '',
    keywords: '',
    limit: 5,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get<Recipe[]>('http://localhost:4000/recipes', {
        params: filter,
      });
      setRecipes(response.data);
    } catch (error) {
      Logger.error('Error fetching recipes:', error);
    }
  };

  return (
    <main className="c-pourqoi__home">
      <h1 className="c-pourqoi__home-headline">Recipe Generator</h1>

      <div className="c-pourqoi__home-form">
        <input
          type="text"
          name="ingredients"
          placeholder="Filter by ingredients"
          value={filter.ingredients}
          onChange={handleInputChange}
          className="c-pourqoi__home-input"
        />
        <input
          type="text"
          name="keywords"
          placeholder="Filter by keywords"
          value={filter.keywords}
          onChange={handleInputChange}
          className="c-pourqoi__home-input"
        />
        <input
          type="number"
          name="limit"
          value={filter.limit}
          onChange={handleInputChange}
          className="c-pourqoi__home-input"
        />
        <button type="button" onClick={fetchRecipes} className="c-pourqoi__home-submit">
          Generate Menu
        </button>
      </div>

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
