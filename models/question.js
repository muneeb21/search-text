const mongoose = require('mongoose');


// schema for every patient
const questionSchema = new mongoose.Schema({
    
    querry: {
        type: String,
        required: true,
    },

    topic: {
        type: String,
        required: true,
        enum:["criteria1","new addmission","criteria2","criteria3"],
    },
    

    tags: [
		{
			type: String,
            required:true,
            enum:["usa","germany","europe","australia","admission","engineering","mbbs","france"],
		},
	],
    
    
}, {
    timestamps: true
});



const Question = mongoose.model('Question', questionSchema);

module.exports = Question;