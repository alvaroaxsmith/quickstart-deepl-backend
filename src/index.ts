import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import translationRoutes from "./routes/translationRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", translationRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
