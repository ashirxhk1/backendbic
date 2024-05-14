const escalationModel = require("../model/Escalation") 

exports.escalation = async(req,res) => {
    try{
        const data = {
            owner:req.user._id,
            useremail:req.body.email,
            leadID:req.body.leadId,
            evaluatedby:req.body.evaluatedBy,
            agentName:req.body.agentName,
            teamleader:req.body.teamLeader,
            leadsource:req.body.leadSource,
            leadstatus:req.body.leadStatus,
            escalationseverity:req.body.escSeverity,
            issueidentification:req.body.issueIden,
            escalationaction:req.body.escAction,
            additionalsuccessrmation:req.body.successmaration
        }
        const details = await escalationModel(data)
        await details.save()
        res.status(202).json({details,message:"created!",success:true})
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}