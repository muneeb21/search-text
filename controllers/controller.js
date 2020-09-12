const Question=require('../models/question');

module.exports.insert=async function(req,res){

    try{
       const querry=await Question.findOne({querry:req.body.querry});
       if(querry){
        return res.status(200).json({
            message:
                "Question already present",
        });
       }
       let newQuerry = await Question.create(req.body);
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
    const data=[];var j=0;
    for(let i=0;i<querry.length;i++){
      var temp=querry[i].querry;
      var lowerTemp=temp.toLowerCase();
      var check=lowerTemp.search(req.body.querry);
      if(check){
          data[j++]=temp;
      }
    }
    if(data.length>0){
        return res.status(200).json({
            message:
                "Question inserted successfully",
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