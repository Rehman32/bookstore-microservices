const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    //check if authorization header exists and starts with bearer
    if (
      req.headers.authorization &&
      req.headers.authorization.startWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")["1"];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }
    
    //verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    //attach user id to request object 
    req.user = {id:decoded.id};

    // Continue to next middleware/controller
    next();


  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired'
    });
  }
};

module.exports = { protect };