import React, {ChangeEvent, useState} from "react";
import axios from "axios";

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

const Home = () => {
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
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="c-pourquoi__home">
            <h1>Recipe Generator</h1>

            <form>
                <input
                    type="text"
                    name="ingredients"
                    placeholder="Filter by ingredients"
                    value={filter.ingredients}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="keywords"
                    placeholder="Filter by keywords"
                    value={filter.keywords}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="limit"
                    value={filter.limit}
                    onChange={handleInputChange}
                />
                <button onClick={fetchRecipes}>Generate Menu</button>
            </form>

            <div>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
