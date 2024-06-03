const User = require('../model/user')
const teamlead = require('../model/TeamLead')
const jwt = require("jsonwebtoken")

exports.userRegister=async(req,res) =>{
    try {
        const data = {
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        }
        const details = await User(data)
        await details.save()
        res.status(202).json({details,message:"created",success:true})
    } catch (error) {
        res.status(500).json({message:error,success:false})
    }
}

exports.login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({
            _id: user._id,
            userEmail: user.email
        },
        process.env.JWT_TOKEN
        )
        res.status(200).json({ message: 'Login successful', user,token,success:true});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.fetchUser = async (req,res) => {
    try{
        const user  = await User.find({role:{$ne:'admin'}}).select('-password').populate('evaluationRating')
        res.status(200).json({user,success:true})
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.addLeader = async (req,res) => {
    try{
        const data = {
            leadName:req.body.leadname
        }
        const details = await teamlead(data)
        await details.save()
        res.status(202).json({details,success:true,message:"created"})
    }catch(err){
        res.status(500).json({ message: 'something went wrong',success:false});
    }
}

exports.deleteLeader = async (req,res) => {
    try{
        await teamlead.findByIdAndDelete(req.params.id)
        res.json({ msg: 'User deleted',success:true});
    }catch(err){
        res.status(500).json({ message: err,success:false});
    }
}

exports.fetchTeamLead = async (req,res) => {
    try{
        const data = await teamlead.find()
        res.json({ data,success:true })
    }catch(err){
        res.status(500).json({ message: err,success:false});
    }
}

exports.logout = async (req,res) => {
    try{
        res.status(200)
        .cookie('token',null,{expires: new Date(Date.now()),httpOnly:true,sameSite:'None',secure:true})
        .json({
            success:true,
            message:"logout!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}