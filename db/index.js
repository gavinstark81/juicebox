const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/juicebox-dev");

// helper function
async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `
  );

  return rows;
}

// creating users function
async function createUser({ username, password }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2);
    `,
      [username, password]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

// module.exports = { createUser };
// exporting helper functions
module.exports = {
  client,
  getAllUsers,
  createUser,
};
