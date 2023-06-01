var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	'message': String,
	'postedBy': {
		type: mongoose.Types.ObjectId,
		ref: 'users'
	},
	'postedTo': {
		type: mongoose.Types.ObjectId,
		ref: 'photos'
	},
},
{ timestamps: true }

);



module.exports = mongoose.model('comments', commentsSchema);


