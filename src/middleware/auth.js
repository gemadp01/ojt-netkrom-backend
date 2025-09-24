import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  // ambil token dari header -> Bearer[0] token[1]
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer token"

  // cek token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // cek token validasi
    const verified = jwt.verify(token, JWT_SECRET);

    // tambahkan user dari payload token
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export default auth;
