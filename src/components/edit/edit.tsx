import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Logger from '../../utils/logger/logger';

function Edit(): React.JSX.Element {
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch existing ingredients on component mount
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:4000/ingredients');
        setIngredients(response.data);
      } catch (error) {
        Logger.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(e.target.value);
  };

  const addIngredient = async (e: FormEvent) => {
    e.preventDefault();

    if (!newIngredient) {
      setErrorMessage('Please provide an ingredient name');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/ingredients', {
        name: newIngredient,
      });
      setIngredients([...ingredients, response.data.name]);
      setNewIngredient('');
      setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        Logger.warn('Error adding ingredient:', error);
      }
    }
  };

  const removeIngredient = async (ingredient: string) => {
    try {
      await axios.delete(`http://localhost:4000/ingredients/${ingredient}`);
      setIngredients(ingredients.filter((ing) => ing !== ingredient));
    } catch (error) {
      Logger.error('Error deleting ingredient:', error);
      setErrorMessage('Failed to delete ingredient');
    }
  };

  return (
    <main className="c-pourqoi__edit">
      <h2 className="c-pourqoi__edit-headline">Manage Ingredients</h2>
      <form onSubmit={addIngredient} className="c-pourqoi__edit-form">
        <input
          type="text"
          placeholder="New Ingredient"
          value={newIngredient}
          onChange={handleIngredientChange}
        />
        <button type="submit">Add Ingredient</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>

      <table className="c-pourqoi__edit-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.toLowerCase().trim()}>
              <td>{ingredient}</td>
              <td>
                <button type="button" onClick={() => removeIngredient(ingredient)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Edit;
