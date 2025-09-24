import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimier from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimier);


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server started on port:", PORT);
  });
});
