async function getAllReminders(req, res) {
  try {
    const reminders = await Reminder.getAllReminders(); // 🔥 was spelled "remidners"
    res.status(200).json(reminders); // ❌ was res.json(books) -- where did "books" come from?!
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving reminders" }); // "books" again?
  }
}
