const User = require("../models/userModel");

async function createUser(req, res) {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser); // Send back created user
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

// Other CRUD operations...

async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users" });
  }
}

async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users with books" });
  }
}
