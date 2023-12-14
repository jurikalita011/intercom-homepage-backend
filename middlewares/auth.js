var jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || null;

    let decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    req.name = decoded.user;
    next();
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error });
  }
};
module.exports = { authMiddleware };
