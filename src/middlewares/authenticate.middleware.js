const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const tokenService = require('../services/token.service');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const rawToken = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
    } catch (err) {
      throw new ApiError(401, 'Invalid or expired token');
    }

    const session = await tokenService.consumeTokenUse(decoded.jti);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    req.tokenUsesRemaining = session.usesRemaining;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;