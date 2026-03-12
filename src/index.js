import app from "./app.js";
import dot from "dotenv";
import { connectMongo } from "./infrastructure/database/mongo.js";

const PORT = process.env.PORT || 3000;
dot.config();
await connectMongo();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
