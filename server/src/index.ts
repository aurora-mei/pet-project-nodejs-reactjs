import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const resDeck = await newDeck.save();
  res.json(resDeck);
});
mongoose.connect(process.env.MONGO_URL!).then(() => {
  // console.log(process.env.MONGO_URL);
  console.log(`Connected to database in ${PORT}`);
  app.listen(PORT);
});
