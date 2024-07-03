import jwt from "jsonwebtoken";

export const jwtMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader); // Debugging line
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header is missing." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token); // Debugging line
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing." });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        console.error("Token verification error:", err); // Debugging line
        return res.status(401).json({ message: "Invalid Token" });
      }
      console.log("Decoded Token:", decodedToken); // Debugging line
      req.decoded = decodedToken;
      next();
    });
  } catch (err) {
    console.error("JWT Middleware Error:", err); // Debugging line
    return res.status(500).json({ message: "Internal Server Error. JWT" });
  }
};
