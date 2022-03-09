const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/Wilder");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wild_db", { autoIndex: true })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/wilder/read", wilderController.getAll);
app.put("/api/wilder/update/:id", wilderController.updateById);
app.post("/api/wilder/create", wilderController.create);
app.delete("/api/wilder/delete/:id", wilderController.deleteById);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.listen(3000, () => console.log("Server started on 3000"));
