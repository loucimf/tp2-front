import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "backend",
  });
});

app.get("/", (_req, res) => {
  res.json({
    message: "Express backend is running",
  });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
