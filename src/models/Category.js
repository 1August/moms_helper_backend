const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  label: { type: String, required: true },
}, {
  versionKey: false,
})

const Category = model('categories', categorySchema)

module.exports = {
  Category,
}
