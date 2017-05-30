var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://mradman123:1234@ds157621.mlab.com:57621/pp_todo_api'
};
mongoose.connect(db.mlab);

//tstst
module.exports = {
  mongoose
};
