// Setup mongoose
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/bookapp";


module.exports = () => {
    mongoose.connect(connectionString, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connection to database Successful...")
        }
    });
}