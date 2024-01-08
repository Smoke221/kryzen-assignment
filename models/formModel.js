const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
});

const formModel = new mongoose.model("form", formSchema);

module.exports = { formModel };
