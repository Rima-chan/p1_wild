const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    await WilderModel.init();
    console.log(req.body);
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ success: true, result: result });
  },
  getAll: async (req, res) => {
    await WilderModel.init();
    const result = await WilderModel.find();
    res.status(200).json({ success: true, result: result });
  },
  updateById: async (req, res) => {
    await WilderModel.init();
    const isWilderExist = await WilderModel.findOne({ _id: req.params.id });
    if (!isWilderExist) {
      res
        .status(200)
        .json({ success: true, result: "This wilder doesn't exist ! 🦚" });
    } else {
      const result = await WilderModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(200).json({ success: true, result: result });
    }
  },
  deleteById: async (req, res) => {
    await WilderModel.init();
    await WilderModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true });
  },
};
