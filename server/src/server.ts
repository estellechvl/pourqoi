import express, {Request, RequestHandler, Response} from 'express';
import db from './db/database';

const app = express();
app.use(express.json());

// Endpoint to add a new ingredient
const addIngredient: RequestHandler = (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Ingredient name is required' });
        return;
    }

    try {
        // Check if the ingredient already exists
        const checkStmt = db.prepare('SELECT COUNT(*) AS count FROM ingredients WHERE name = ?');
        const existing = checkStmt.get(name) as unknown as {count: number};

        if (existing.count > 0) {
            res.status(400).json({ error: 'Ingredient already exists' });
            return;
        }

        const insertStmt = db.prepare('INSERT INTO ingredients (name) VALUES (?)');
        const result = insertStmt.run(name);

        res.status(201).json({ id: result.lastInsertRowid, name });
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(500).json({ error: 'Failed to add ingredient' });
    }
};

// Use the handler with the POST route
app.post('/ingredients', addIngredient);

// Endpoint to delete an ingredient
app.delete('/ingredients/:name', (req: Request, res: Response) => {
    const { name } = req.params;

    try {
        const stmt = db.prepare('DELETE FROM ingredients WHERE name = ?');
        const result = stmt.run(name);

        if (result.changes > 0) {
            res.status(200).json({ message: 'Ingredient deleted successfully' });
        } else {
            res.status(404).json({ error: 'Ingredient not found' });
        }
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ error: 'Failed to delete ingredient' });
    }
});

// Endpoint to get all ingredients
app.get('/ingredients', (req: Request, res: Response) => {
    try {
        const stmt = db.prepare('SELECT name FROM ingredients');
        const ingredients = stmt.all();
        res.json(ingredients.map((row: any) => row.name));
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
});

// Endpoint to get recipes with optional filters
app.get('/recipes', (req: Request, res: Response) => {
    const { ingredients, keywords, limit } = req.query;

    let query = 'SELECT * FROM recipes WHERE 1=1';
    if (ingredients) {
        query += ` AND ingredients LIKE '%${ingredients}%'`;
    }
    if (keywords) {
        query += ` AND keywords LIKE '%${keywords}%'`;
    }
    if (limit) {
        query += ` LIMIT ${limit}`;
    }

    const stmt = db.prepare(query);
    const recipes = stmt.all();
    res.json(recipes);
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
