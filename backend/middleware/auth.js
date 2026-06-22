const jwt = require("jsonwebtoken");


const verifyAdmin = (req, res, next) => {


  const authHeader = req.headers.authorization;



  if (!authHeader) {

    return res.status(401).json({
      message: "No token provided"
    });

  }



  const token = authHeader.startsWith("Bearer ")

    ? authHeader.split(" ")[1]

    : authHeader;



  if (!token) {

    return res.status(401).json({
      message: "Token missing"
    });

  }




  try {


    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET || "secretKey123"

    );



    req.admin = decoded;



    next();



  } catch (err) {


    console.log("JWT ERROR:", err.message);



    return res.status(401).json({

      message: "Invalid token"

    });


  }


};



module.exports = verifyAdmin;