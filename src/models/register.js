const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
	fname:{
		type: String,
		required: true,
		minlength: 2
	},
	email:{
		type: String,
		required: true,
		unique: true,
	},
	password:{
		type: String,
		required: true,
		minlength: 5
	},

})

const Register =  new mongoose.model("Register",empSchema);
module.exports = Register;