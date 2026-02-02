const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
      name : {
          type : String,
          required : true,
          minLength : 3
      },
      city : {
          type : String,
          required : true
      },
      pincode : {
          type : Number,
          required : true
      },
      movies : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Movie'
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      description : String,
      address : String
}, { timestamps : true });

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;