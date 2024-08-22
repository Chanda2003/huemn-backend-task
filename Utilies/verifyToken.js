
const jwt= require("jsonwebtoken")
const User= require("../Model/userSchema")

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
  
        const decoded = jwt.verify(token, process.env.JWT_SECURE);
        console.log(decoded)
        req.user = await User.findById(decoded.user).select('-password'); 
  
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({
          status: 'Fail',
          message: 'Not authorized, token failed',
        });
      }
    } else {
      return res.status(401).json({
        status: 'Fail',
        message: 'Not authorized, no token',
      });
    }
  };
  
 
  const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: "fail",
          message: "Access denied. You do not have the required permission.",
        });
      }
      next();
    };
  };


  module.exports={
    protect,
    restrictTo
  }
