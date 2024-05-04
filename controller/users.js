const user = require('../model/user')
exports.users=async(req,res) =>{
    try {
        const data = {
            email:req.body.email,
            password:req.body.password,
        }
        const userdata = await user(data)
        await userdata.save()
        res.status(201).json({message:"created!",data})
    } catch (error) {
        res.status(500).json({message:error})
    }
}