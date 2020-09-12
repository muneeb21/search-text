// Requiring Questions model schema
const Question=require('../models/question');

// Storing the possible values of topics and tags stored in schema(enum)
const POSSIBLE_TOPICS=["criteria1","new addmission","criteria2","criteria3"];
const POSSIBLE_TAGS=["usa","germany","europe","australia","admission","engineering","mbbs","france"];

// A utility function to check if element exists in possible topics
function topicAvailability(topic){
    if(POSSIBLE_TOPICS.includes(topic)){
        return true;
    }
    return false;
}

 // A utility function to check if element exists in possible tags
function tagsAvailability(tags){
    for(let i=0;i<tags.length;i++){
     if(!POSSIBLE_TAGS.includes(tags[i])){
         return false;
     }
    }
    return true;
}

// A function to insert new questions on the basis od data given
module.exports.insert=async function(req,res){

    try{

        // Check if question already exists
       const check=await Question.findOne({querry:req.body.querry});
       if(check){
        return res.status(200).json({
            message:
                "Question already present",
        });
       }

       const body=req.body;
       console.log(body);

    //    Storing all the tags in a seperate array 
    //    as there can be multiple number of tags
       const tags=[];
       let counter=0;
       for(var i in body){
          if(i!=="querry" && i!="topic"){
              tags[counter++]=body[i];          }
       }


       console.log(tags);
       const querry=req.body.querry;
       const topic =req.body.topic;
       
    //    Check availability of topics and tags with help of utility functions made
       var checkTopic= topicAvailability(topic);
       var checkTags=tagsAvailability(tags);

    //    If invalid return invalid
       if(!checkTags || !checkTopic){
        return res.status(200).json({
            message:
                "Invalid Topic or Tags",
        });     
       }

    //    Else you are good to create a new querry
       let newQuerry = await Question.create({querry,topic,tags});
       return res.status(200).json({
        message:
            "Question inserted successfully",
    });
    }

    // For further any error
    catch(err){
        console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
    }
}


// A function to select questions as per users requirements
module.exports.select=async function(req,res){
    try{
//  First fetching all the querries
    const querry=await Question.find();
    console.log(querry);

    // Creating an array to store all the relevant questions 
    const data=[];var j=0;
    for(let i=0;i<querry.length;i++){
      var temp=querry[i].querry;
      let tags=querry[i].tags;
      
    //   converting it into lowercase
      var lowerTemp=temp.toLowerCase();

    //   CHecking if tag or string entered by user exists or not
    // If exists the store the question in data array
      var check1=lowerTemp.search(req.body.tag);
      var check2= tags.indexOf(req.body.tag);
      if(check1!==-1 || check2!=-1){
          console.log(check1,check2);
          data[j++]=temp;
      }
    }


    console.log(data);
    // If data length is greater than 0 then there exists relevant questions
    if(data.length>0){
        return res.status(200).json({
            message:
                "Found the querries successfully",
                data: data
        });
    }
    
    return res.status(200).json({
        message:
            "No question related to this querry",
    });

}catch(err){
    console.log('********',err);
    return res.status(500).json({
        message: "Internal Server Error",
    });
}


    
}