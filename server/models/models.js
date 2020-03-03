const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotebookSchema = new Schema(
  {
    title: String,
    details: String,
    notes: String,
    tasks: [{
      title: String,
      completed: Boolean,
  }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notebook', NotebookSchema)

