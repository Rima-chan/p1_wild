const express = require("express");
const mongoose = require("mongoose");
const wilderRoutes = require("./routes/wilder");
const cors = require("cors");
const app = express();
const PORT = 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/wilder_db", { autoIndex: true })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/wilders", wilderRoutes);

app.use((error, req, res, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    res
      .status(400)
      .json({ success: false, result: "This name is already taken 🙁" });
  } else if (error.name === "CastError" && error.path === "_id") {
    res
      .status(400)
      .json({ success: false, result: "Sorry we cannot find you 😥" });
  } else {
    res.status(400).json({ success: false, result: "Unknown error" + error });
  }
});

app.use("/", (req, res) => {
  res.status(404);
  res.send({ success: false, result: "Wrong adress" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
