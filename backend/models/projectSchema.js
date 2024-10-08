let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, required: true },
  position: { type: Number, required: true },
});

module.exports = mongoose.model("Project", projectSchema);
