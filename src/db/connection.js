const mongoose = require("mongoose");


module.exports = mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => console.log("conncected to database successfully"))
.catch( (err) => console.error(err.message));

