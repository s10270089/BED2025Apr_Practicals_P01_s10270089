const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Homework API");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Define route for intro Page
app.get("/name", (req, res) => {
    res.send("My name is How Shao Yang Louis, i am 21 years old and currently studying in Ngee Ann Polytechnic");
});

// Define route for name Page
app.get("/name", (req, res) => {
    res.send("How Shao Yang Louis");
});

// Define route for hobbies Page
app.get("/hobbies", (req, res) => {
    res.send("My hobbies are gaming, tinkering and learning new things");
});

// Define route for food Page
app.get("/food", (req, res) => {
    res.send("My favourite foods are fried food, especially fish & chips and sweet stuff");
});


// Listen on the port after defining routes
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});