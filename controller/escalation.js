const escalationModel = require("../model/Escalation") 

exports.escalation = async(req,res) => {
    try{
        const data = {
            owner:req.user._id,
            useremail:req.body.email,
            leadID:req.body.leadId,
            evaluatedby:req.body.evaluatedUserName,
            agentName:req.body.agentName,
            teamleader:req.body.teamleader,
            leadsource:req.body.leadsource,
            leadstatus:req.body.leadstatus,
            escalationseverity:req.body.escalationseverity,
            issueidentification:req.body.issueidentification,
            escalationaction:req.body.escalationAction,
            additionalsuccessrmation:req.body.additionalsuccessrmation,
        }
        const details = await escalationModel(data)
        await details.save()
        res.status(202).json({details,message:"created!"})

    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}