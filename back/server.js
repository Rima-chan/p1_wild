const express = require("express");
const mongoose = require("mongoose");
const wilderRoutes = require("./routes/wilder");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wilder_db", { autoIndex: true })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/wilders", wilderRoutes);

app.use("/", (req, res) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error, req, res, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    res.status(400).json({ success: false, result: "Ce nom est déjà pris ! " });
  } else if (error.name === "CastError" && error.path === "_id") {
    res.status(400).json({ success: false, result: "L'id n'est pas valide !" });
  } else {
    res.status(400).json({ success: false, result: "Unknown error" + error });
  }
});

app.listen(3000, () => console.log("Server started on 3000"));
