const Wilder = require("../models/Wilder");
const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    try {
      await WilderModel.init();
      const wilder = new WilderModel(req.body);
      const result = await wilder.save();
      res.status(201).json({ success: true, result: result });
    } catch (err) {
      res.status(500).json({ success: false, result: err });
    }
  },
  getAll: async (req, res) => {
    try {
      await WilderModel.init();
      const result = await WilderModel.find();
      if (result.length === 0) {
        res.status(404).json({
          success: true,
          result: "Aucun Wilder inscrit pour le moment",
        });
      } else {
        res.status(200).json({ success: true, result: result });
      }
    } catch (err) {
      res.status(500).json({ success: false, result: err });
    }
  },
  updateById: async (req, res) => {
    try {
      await WilderModel.init();
      const result = await WilderModel.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(200).json({ success: true, result: result });
    } catch (err) {
      res.status(500).json({ success: false, result: err });
    }
  },
  deleteById: async (req, res) => {
    try {
      await WilderModel.init();
      await WilderModel.findOneAndDelete(req.params.id);
      res.status(204);
    } catch (err) {
      res.status(500).json({ success: false, result: err });
    }
  },
};
