var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var crypto = require('crypto');
var path = require('path');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf');

Mongoose.connect('mongodb://MongoLab-i:cVh9wgoCunTD9vdx1ViKiduRv2V2b3RrcukZeXsv.sY-@ds050077.mongolab.com:50077/MongoLab-i');
//mongodb://localhost/shortly
// var db = Mongoose.connection;

// var UserSchema = new Schema({
//   username: String,
//   password: String,
//   createdAt: {type: Date, default: Date.now()}
// });


// var UrlSchema = new Schema({
//   url: String,
//   base_url: String,
//   code: String,
//   title: String,
//   visits: Number,
//   createdAt: {type: Date, default: Date.now()},
//   updatedAt: {type: Date}
// });

// hashPassword: function(username, password){
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(password, null, null).bind(this);

// }

// UsersSchema.pre('save', function(next) {
//   var user = this;
//   hashPassword(user.username, user.password)
//     .then(function(hash) {
//       user.password = hash;
//       next();
//     });
// });

// modules.exports.url = Mongoose.model('Url', UrlSchema);
// modules.exports.user = Mongoose.model('User', UserSchema);





var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'shortlydb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/shortly.sqlite')
  }
});

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
