const { Schema, model } = require('mongoose')

const pillSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  categories: { type: [Schema.Types.ObjectId], ref: 'categories', defaultValue: Array },
  src: { type: String, required: true },
  alt: { type: String, required: true },
  stars: { type: Number, min: [0, 'Min value is 0'], max: [5, 'Max value is 5'], required: true },
}, {
  versionKey: false,
})

const Pill = model('pills', pillSchema)

module.exports = {
  Pill,
}
