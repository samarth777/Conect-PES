let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let gallerySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  position: { type: Number, required: true },
});

module.exports = mongoose.model("Gallery", gallerySchema);