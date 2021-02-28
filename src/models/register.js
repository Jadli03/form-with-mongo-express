const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

empSchema.pre("save", async function(next) {
	if(this.isModified("password"))
	{
		this.password = await bcrypt.hash(this.password,10);
	}
	next();
})

const Register =  new mongoose.model("Register", empSchema);
module.exports = Register;