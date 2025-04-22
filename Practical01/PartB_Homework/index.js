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
app.get("/intro", (req, res) => {
    res.send("My name is How Shao Yang Louis, i am 21 years old and currently studying in Ngee Ann Polytechnic");
});

// Define route for name Page
app.get("/name", (req, res) => {
    res.send("How Shao Yang Louis");
});

// Define route for hobbies Page
app.get("/hobbies", (req, res) => {
    var hobbies = ["gaming", "tinkering", "learning new things"];
    var hobbiesList = hobbies.join(", ");
    res.send(`My hobbies are ${hobbiesList}`);
});

// Define route for food Page
app.get("/food", (req, res) => {
    res.send("My favourite foods are fried food, especially fish & chips and sweet stuff");
});

// Define route for student Page
app.get("/student", (req, res) => {
    var student = {
        name: "How Shao Yang Louis",
        hobbies: ["gaming", "tinkering", "learning new things"],
        intro: "My name is How Shao Yang Louis, i am 21 years old and currently studying in Ngee Ann Polytechnic",
    };
    res.send(student.intro);
});

// Listen on the port after defining routes
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});