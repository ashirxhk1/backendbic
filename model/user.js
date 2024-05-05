const mongoose = require("mongoose")
const users = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "email already exists"],
      },
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    evaluationdetail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "evaluation"
        }
    ],
    escalationdetail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "escalation"
        }
    ]
})

module.exports = mongoose.model('users',users)