import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
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
        const userRes = {
          user: {
            name: decodedToken.user.name,
            email: decodedToken.user.email,
          },
          token,
        };
        console.log(decodedToken);
        res.json(userRes);
      }
    });
  } else {
    res.send(false);
  }
};
