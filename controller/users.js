const User = require('../model/user')
const jwt = require("jsonwebtoken")
exports.userRegister=async(req,res) =>{
    try {
        const data = {
            email:req.body.email,
            password:req.body.password,
        }
        const details = await User(data)
        await details.save()
        res.status(202).json({details,message:"created"})
    } catch (error) {
        res.status(500).json({message:error})
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
        res.status(200).json({ message: 'Login successful', user,token});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}