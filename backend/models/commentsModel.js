var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	'message': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	'postedTo': {
		type: Schema.Types.ObjectId,
		ref: 'photos'
	}
});



module.exports = mongoose.model('comments', commentsSchema);


