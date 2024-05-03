const mongoose = require("mongoose")
const evaluation = mongoose.Schema({
    useremail:{type:String,required:[true, "field is require"]},
    leadID:{type:String,required:[true, "field is require"]},
    agentName:{type:String,required:[true, "field is require"]},
    mod:{type:String,required:[true, "field is require"]},
    teamleader:{type:String,required:[true, "field is require"]},
    greetings:[{type:String}],
    accuracy:[{type:String}],
    building:[{type:String}],
    presenting:[{type:String}],
    closing:[{type:String}],
    bonus:[{type:String}],
    evaluationsummary:[{type:String}],
})
module.exports = mongoose.model('Evaluation',evaluation)