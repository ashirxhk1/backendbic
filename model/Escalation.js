const mongoose = require("mongoose")
const escalation = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    useremail: {
        type: String,
        required: [true, "Email is required"]
    },
    leadID: {
        type: String,
        required: [true, "Lead ID is required"]
    },
    evaluatedby: {
        type: String,
        required: [true, "Evaluated by is required"]
    },
    agentName: {
        type: String,
        required: [true, "Agent name is required"]
    },
    teamleader: {
        type: String
    },
    leadsource: [{
        source: {
            type: String,
            required: true
        }
    }],
    leadstatus: [{
        status: {
            type: String,
            required: true
        }
    }],
    escalationseverity: [{
        severity: {
            type: String,
            required: true
        }
    }],
    issueidentification: [{
        identify: {
            type: String,
            required: true
        }
    }],
    escalationaction: [{
        action: {
            type: String,
            required: true
        }
    }],
    additionalsuccessrmation: [{
        summary: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('escalation',escalation)
