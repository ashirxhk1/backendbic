const mongoose = require("mongoose")
const evaluation = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    useremail:{
        type:String,
        required:[true, "field is require"]
    },
    leadID:{
        type:String,
        required:[true, "field is require"]
    },
    agentName:{
        type:String,
        required:[true, "field is require"]
    },
    mod:{
        type:String,
        required:[true, "field is require"]
    },
    teamleader:{
        type:String,
        required:[true, "field is require"]
    },
    greetings:[{
        greet:{
            type:String,
            required: true
        }
    }],
    accuracy:[{
        acc:{
            type:String,
            required: true
        }
    }],
    building:[{
        build:{
            type:String,
            required: true
        }
    }],
    presenting:[{
        present:{
            type:String,
            required: true
        }
    }],
    closing:[{
        close:{
            type:String,
            required: true
        }
    }],
    bonus:[{
        bonuss:{
            type:String,
            required: true
        }
    }],
    evaluationsummary:[{
        summary:{
            type:String,
            required: true
        }
    }],
})
module.exports = mongoose.model('evaluation',evaluation)