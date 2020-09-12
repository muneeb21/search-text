const mongoose = require('mongoose');


// schema for every patient
const auestionSchema = new mongoose.Schema({
    
    querry: {
        type: String,
        required: true
    },

    topic: {
        type: Number,
        required: true,
        unique: true
    },
    

    tags: [
		{
			type: String,
			required:true
		},
	],
    
    
}, {
    timestamps: true
});



const Question = mongoose.model('Question', questionSchema);

module.exports = Question;