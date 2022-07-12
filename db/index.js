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

// exporting helper function
module.exports = {
  client,
  getAllUsers,
};
