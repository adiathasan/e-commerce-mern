import jsonwebtoken from "jsonwebtoken";

const generateToken = (userId) => {
  return jsonwebtoken.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
