import jsonwebtoken from 'jsonwebtoken';

// Generate Token
const generateToken = (user_id) => {
  return jsonwebtoken.sign(
    { isAdmin: false, userId: user_id },
    process.env.SECRET,
    { expiresIn: "1h" });
}

export { generateToken };
