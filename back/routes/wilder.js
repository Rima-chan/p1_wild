const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const wilderController = require("../controllers/Wilder");

router.get("/", asyncHandler(wilderController.getAll));
router.put("/:id", asyncHandler(wilderController.updateById));
router.post("/", asyncHandler(wilderController.create));
router.delete("/:id", asyncHandler(wilderController.deleteById));

module.exports = router;
