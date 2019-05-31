var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Banking', 
{
     username: {type: String, unique:true,required: true },
	 passwd: {type: String,required: true },
     balance: {type: Number,default: 0 }
}
);

// var CusSchema = new mongoose.Schema({
     // cid: Number,
	 // name: String,
	 // phone: String,
     // emailAddresses: String,
	 
 // });

var ActSchema = new mongoose.Schema({
     username: {type: String, unique:true,required: true },
	 passwd: {type: String,required: true },
     balance: {type: Number,default: 0 }
	 
});
