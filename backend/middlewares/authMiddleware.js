import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWt_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).send("not required");
      } else {
        next();
      }
    });
  }
};
