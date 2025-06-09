const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const reminderRoutes = require("./practice 1/routes/reminderRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/reminders", reminderRoutes); // 💥 Not reminderController directly

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  process.exit(0);
});
