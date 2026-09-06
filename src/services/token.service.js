const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const TokenSession = require('../models/TokenSession.model');
const ApiError = require('../utils/ApiError');

const MAX_USES = 10;

const issueToken = async (userId, role) => {
  const jti = uuidv4();

  await TokenSession.create({
    jti,
    userId,
    usesRemaining: MAX_USES,
    isRevoked: false,
  });

  const token = jwt.sign(
    { userId, role, jti },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

const consumeTokenUse = async (jti) => {
  const session = await TokenSession.findOne({ jti });

  if (!session) {
    throw new ApiError(401, 'Token session not found. Please login again.');
  }

  if (session.isRevoked || session.usesRemaining <= 0) {
    throw new ApiError(401, 'Token has expired after maximum uses. Please login again.');
  }

  session.usesRemaining -= 1;

  if (session.usesRemaining <= 0) {
    session.isRevoked = true;
  }

  await session.save();

  return session;
};

module.exports = {
  issueToken,
  consumeTokenUse,
};