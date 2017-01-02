var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://jairperezs:D1e560*9c@ds019756.mlab.com:19756/dopemusic')
mongoose.Promise = global.Promise;

var userSchemaJSON = {
    email: String,
    username: String,
    password: String
}

var user_schema = new Schema(userSchemaJSON)

module.exports = mongoose.model('User' , user_schema);