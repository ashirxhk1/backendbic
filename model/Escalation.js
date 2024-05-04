const mongoose = require("mongoose")
const escalation = mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId,
        ref: "users"},
    useremail:{type:String,required:[true, "field is require"]},
    leadID:{type:String,required:[true, "field is require"]},
    evaluatedby:{type:String,required:[true, "field is require"]},
    agentName:{type:String,required:[true, "field is require"]},
    teamleader:{type:String,
    leadsource:[{type:String}],
    leadstatus:[{type:String}],
    escalationseverity:[{type:String}],
    issueidentification:[{type:String}],
    escalationaction:[{type:String}],
    additionalsuccessrmation:[{type:String}],
}
})

module.exports = mongoose.model('Escalation',escalation)
