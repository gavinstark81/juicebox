// nodes version of "importing"
const {
  client,
  getAllUsers,
  createUser,
  updateUser,
  createPost,
} = require("./index");

// dropping tables function
async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

// create tables function
async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      location varchar(255) NOT NULL,
      active BOOLEAN DEFAULT true
      );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

// function for creating initial users
async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
      name: "albert wilde",
      location: "Japan",
    });

    await createUser({
      username: "sandra",
      password: "2sandy4me",
      name: "sandra yugi",
      location: "canada",
    });
    await createUser({
      username: "glamgal",
      password: "soglam",
      name: "glammy glam",
      location: "brazil",
    });

    // console.log("this is our USER:", albert); // logging albert as test user

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

// function for rebuild testing
async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

// function for testing
async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);
    // const updatedUser = await updateUser(2, {
    //   name: "johnny",
    //   location: "brazil",
    // });
    const newPost = await createPost({
      authorId: 1,
      title: "BestTitleEver",
      content: "very descriptive content for describing descriptions.",
    });
    console.log("this is the new post", newPost);
    // console.log("this is updated user", updatedUser);
    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
