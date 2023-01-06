import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  try {
    if (bearerToken == undefined) {
      res.status(400).send("not required");
    }
    const token = bearerToken.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWt_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(400).send("not required");
        } else {
          req.user = decodedToken.user;
          req.token = token;
          next();
        }
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
