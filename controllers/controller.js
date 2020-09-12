const Question=require('../models/question');


const POSSIBLE_TOPICS=["criteria1","new addmission","criteria2","criteria3"];
const POSSIBLE_TAGS=["usa","germany","europe","australia","admission","engineering","mbbs","france"];


function topicAvailability(topic){
    if(POSSIBLE_TOPICS.includes(topic)){
        return true;
    }
    return false;
}

function tagsAvailability(tags){
    for(let i=0;i<tags.length;i++){
     if(!POSSIBLE_TAGS.includes(tags[i])){
         return false;
     }
    }
    return true;
}

module.exports.insert=async function(req,res){

    try{
       const check=await Question.findOne({querry:req.body.querry});
       if(check){
        return res.status(200).json({
            message:
                "Question already present",
        });
       }
       const body=req.body;
       console.log(body);
       const tags=[];
       let counter=0;
       for(var i in body){
          if(i!=="querry" && i!="topic"){
              tags[counter++]=body[i];          }
       }
       console.log(tags);
       const querry=req.body.querry;
       const topic =req.body.topic;
       var checkTopic= topicAvailability(topic);
       var checkTags=tagsAvailability(tags);
       if(!checkTags || !checkTopic){
        return res.status(200).json({
            message:
                "Invalid Topic or Tags",
        });     
       }
       let newQuerry = await Question.create({querry,topic,tags});
       return res.status(200).json({
        message:
            "Question inserted successfully",
    });
    }
    catch(err){
        console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
    }
}



module.exports.select=async function(req,res){
    try{
    const querry=await Question.find();
    console.log(querry);
    const data=[];var j=0;
    for(let i=0;i<querry.length;i++){
      var temp=querry[i].querry;
      let tags=querry[i].tags;
      var lowerTemp=temp.toLowerCase();
      var check1=lowerTemp.search(req.body.tag);
      var check2= tags.indexOf(req.body.tag);
      if(check1!==-1 || check2!=-1){
          console.log(check1,check2);
          data[j++]=temp;
      }
    }
    console.log(data);
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