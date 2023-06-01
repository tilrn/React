var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
	'name': String,
	'path': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	'views': Number,
	'likes': [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
});

module.exports = mongoose.model('photos', photoSchema);
