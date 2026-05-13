import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

type Environment = "development" | "production" | "test";
export const ENVIRONMENT: Environment = "development";

const PORT = Number(process.env.PORT) || 3001;
export const API_KEY = process.env.RAWG_API_KEY;

app.listen(PORT, () => {
  console.log(`Environment: ${ENVIRONMENT}`);
  console.log(`RAWG API Key: ${API_KEY ? "Configured" : "Not Configured"}`);
  console.log(`Backend listening on http://localhost:${PORT}`);
});
