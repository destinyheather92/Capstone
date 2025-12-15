const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema({
          quantity: { type: String },
          material: { type: String },
          //source is import / export
          source: {type: String}
});

// const LoadSchema = mongoose.model("loads", loadSchema);

module.exports = loadSchema;