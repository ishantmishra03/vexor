import jwt from 'jsonwebtoken'

export const adminLogin = async (req,res) => {
    const { email, password } = req.body;
    try {
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid credentials"}); 
        }

        let token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}