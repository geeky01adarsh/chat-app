import app from "./app.js";
import { connect_db } from "./database.js";


connect_db();
app.listen(5000, () => {
  console.log("Successfully connected to the server");
});
