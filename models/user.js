const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// User Schema
const UserSchema = mongoose.Schema({

local:{	
	name:{
		type: String,
		//required: true
	},
	email:{
		type: String,
		//required: true
	  },
	username:{
		type: String,
		//required: true
	  },
	password:{
		type: String,
		//required: true
	  }
	},
facebook: {
		id: String,
		token: String,
		name: String,
		email: String
	}
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}
const User = module.exports = mongoose.model('User', UserSchema);
