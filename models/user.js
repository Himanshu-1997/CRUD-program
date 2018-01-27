const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// User Schema
const UserSchema = mongoose.Schema({
local:{	
	name:String,
	email:String,
	username:String,
	password:String
	},
facebook:{
		id: String,
		token: String,
		name: String,
		email: String
	}
/*google: {
		id: String,
		token: String,
		email: String,
		name: String
	}*/
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}
const User = module.exports = mongoose.model('User', UserSchema);
