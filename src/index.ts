import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import translationRoutes from "./routes/translationRoutes";
import authRoutes from "./routes/authRoutes";
import { AppDataSource } from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", translationRoutes);
app.use("/api/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully with TypeORM!");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to database:", error));
