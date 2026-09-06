const authService = require('../services/auth.service');
const { registerSchema } = require('../validators/auth.validator');
const ApiError = require('../utils/ApiError');

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }
    const user = await authService.registerUser(value);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};