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
mongoose
  .connect(
    "mongodb+srv://huyencttde180614:nQHMYsphFe04tgBb@cluster0.emwa2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`Connected to database in ${PORT}`);
    app.listen(PORT);
  });
