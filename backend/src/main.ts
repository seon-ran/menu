import { Request, Response } from "express";
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static("../client"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/submit", (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
