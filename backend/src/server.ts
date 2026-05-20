import { app } from "./app.js";
import { ENVIRONMENT, PORT, RAWG_API_KEY } from "./env.js";

app.listen(PORT, () => {
  console.log(`Environment: ${ENVIRONMENT}`);
  console.log(`RAWG API Key: ${RAWG_API_KEY ? "Configured" : "Not Configured"}`);
  console.log(`Backend listening on http://localhost:${PORT}`);
});
