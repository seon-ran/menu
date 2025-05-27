import { Request, Response } from "express";
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("../client"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
