import User from "../model/user.Model.js";
import genToken from "../config/token.js";

export const googleAuth = async (req, res) => {
    try {
        // Get data from frontend
        const { name, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });

        // Create user if not
        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        // Generate token
        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true, // Fixed from http: true
            secure: false,
            sameSite: "strict", // Fixed to be a string
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({
            success: false,
            message: `googleAuth error: ${error.message}` // Fixed with backticks
        });
    }
};
export const logout = async (req,res) => {
    try{
         await res.clearCookie("token");
         return res.status(200).json({
             message:"logged out"
         });
    }catch(error){
        return res.status(500).json({
            message:"logout error ${error}"
        });
    }
}

