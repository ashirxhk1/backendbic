const evaluationModel = require("../model/Evaluation") 

exports.evaluation = async(req,res) => {
    try{
        const data = {
            owner:req.user._id,
            useremail:req.body.email,
            leadID:req.body.leadId,
            agentName:req.body.agentName,
            mod:req.body.mod,
            teamleader:req.body.teamleader,
            greetings:req.body.greetings,
            accuracy:req.body.accuracy,
            building:req.body.building,
            presenting:req.body.presenting,
            closing:req.body.closing,
            bonus:req.body.bonus,
            evaluationsummary:req.body.evaluationsummary
        }
        const details = await evaluationModel(data)
        await details.save()
        res.status(202).json({details,message:"created!",success:true})

    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}