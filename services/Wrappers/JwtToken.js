import * as jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
class JwtToken {
  static EncodeJwt(payload) {
    try {
      const expiresInMinutes = 60;
      const token = jwt.sign(payload, secretKey, {
        expiresIn: expiresInMinutes * 60,
      });
      return token;
    } catch (error) {
      jwt.JsonWebTokenError;
    }
  }

  static DecodeJwt(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return jwt.JsonWebTokenError;
    }
  }
}

export { JwtToken };
