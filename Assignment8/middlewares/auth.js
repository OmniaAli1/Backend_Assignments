import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  console.log('Headers:', req.headers); // هيساعدنا نشوف التوكن جاي ازاي
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
    console.log('Token:', token);

    if (!token) {
      return res.status(401).json({ error: 'Authentication required. Please provide a token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Auth error:', error);
    return res.status(401).json({ error: 'Invalid token. Please login again.' });
  }
};

