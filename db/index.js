const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/juicebox-dev");

// creating posts function (NEEDS FIXING STILL)
async function createPost({ authorId, title, content }) {
  try {
    const post = await client.query(
      `
    CREATE TABLE posts(
      id SERIAL PRIMARY KEY,
      "authorId" INTEGER REFERENCES users(id) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      active BOOLEAN DEFAULT true
      );
      `,
      [authorId, title, content]
    );

    return post;
  } catch (error) {
    throw error;
  }
}

// creating users function
async function createUser({ username, password, name, location }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, name, location)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, password, name, location]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// helper function for getting all users
async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, location, active
    FROM users;
  `
  );

  return rows;
}

// updating posts function (UNFINISHED TEMPLATE which mimics updateUser func)
async function updatePost(id, { title, content, active }) {
  try {
  } catch (error) {
    throw error;
  }
}

// updating users function
async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users SET ${setString} WHERE id=${id} RETURNING *`,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// nodes version of "exporting"
module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
  createPost,
  updatePost,
};
