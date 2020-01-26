let mongoose = require('mongoose')

//define a schema
let Schema = mongoose.Schema;

let BookInstanceSchema = new Schema({
	bookName: String,
	bookAuthor: String,
	createdAt: Date
})