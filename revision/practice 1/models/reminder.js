async function addReminder(data) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query =
      "INSERT INTO Reminders (title, date) VALUES (@title, @date); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("title", data.title);
    request.input("date", data.date);
    const result = await request.query(query);
    const newReminderId = result.recordset[0].id;
    return { id: newReminderId, ...data }; // 💥 You forgot to return the reminder
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) await connection.close().catch(console.error);
  }
}
