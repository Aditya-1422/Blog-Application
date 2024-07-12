import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Token:', token); // Debugging line
        if (!token) {
            return res.status(401).json("You are not authenticated!!");
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return res.status(403).json({
                    message: "Token is not valid"
                });
            }
            req.userId = data.id;
            next();
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error!", error: error.message });
    }
};
