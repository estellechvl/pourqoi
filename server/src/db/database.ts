import Database from 'better-sqlite3';

const db = new Database('recipes.db', { verbose: console.log });

export function initializeDB() {
    const createRecipesTable = `
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      steps TEXT,
      keywords TEXT
    );
  `;

    const createIngredientsTable = `
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `;

    db.exec(createRecipesTable);
    db.exec(createIngredientsTable);
}

export default db;
