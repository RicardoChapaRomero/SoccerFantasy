import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    next();
  } else {
    jwt.verify(token, process.env.SECRET, function (err, data) {
      if (err) {
        next();
      } else {
        req.userId = data.userId;
        next();
      }
    });
  }
}

export { verifyToken };
