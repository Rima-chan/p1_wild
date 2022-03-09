const Wilder = require("../models/Wilder");
const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ success: true, result: result });
  },
  getAll: async (req, res) => {
    await WilderModel.init();
    const result = await WilderModel.find();
    if (result.length === 0) {
      res.status(200).json({
        success: true,
        result: "Aucun wilder inscrit pour le moment !",
      });
    }
    res.status(200).json({ success: true, result: result });
  },
  updateById: async (req, res) => {
    await WilderModel.init();
    const isWilderExist = await WilderModel.findOne({ _id: req.params.id });
    if (!isWilderExist) {
      res.status(200).json({ success: true, result: "Inconnu au bataillon" });
    } else {
      const result = await WilderModel.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(200).json({ success: true, result: result });
    }
  },
  deleteById: async (req, res) => {
    await WilderModel.init();
    await WilderModel.findOneAndDelete({ _id: req.params.id });
    res.status(204);
  },
};
