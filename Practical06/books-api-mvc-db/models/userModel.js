const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function createUser(user) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const result = await connection.request()
      .input('username', sql.VarChar(50), user.username)
      .input('email', sql.VarChar(100), user.email)
      .query('INSERT INTO Users (username, email) VALUES (@username, @email)');
    return result.recordset[0]; // Return the newly created user
  } catch (error) {
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function searchUsers(searchTerm) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = `SELECT * FROM Users WHERE username LIKE '%' + @searchTerm + '%' OR email LIKE '%' + @searchTerm + '%'`;
    const result = await connection.request()
      .input("searchTerm", sql.NVarChar, searchTerm)
      .query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function getUsersWithBooks() {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = `
      SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
      FROM Users u
      LEFT JOIN UserBooks ub ON ub.user_id = u.id
      LEFT JOIN Books b ON ub.book_id = b.id
      ORDER BY u.username;
    `;
    const result = await connection.request().query(query);

    const usersWithBooks = {};
    for (const row of result.recordset) {
      const userId = row.user_id;
      if (!usersWithBooks[userId]) {
        usersWithBooks[userId] = {
          id: userId,
          username: row.username,
          email: row.email,
          books: [],
        };
      }
      if (row.book_id !== null) {
        usersWithBooks[userId].books.push({
          id: row.book_id,
          title: row.title,
          author: row.author,
        });
      }
    }

    return Object.values(usersWithBooks);
  } catch (error) {
    console.error("Database error in getUsersWithBooks:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
    createUser,
    searchUsers,
    getUsersWithBooks,
};