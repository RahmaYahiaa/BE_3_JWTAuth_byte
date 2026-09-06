const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      userId: req.user.id,
      role: req.user.role,
      tokenUsesRemaining: req.tokenUsesRemaining,
    },
  });
};

module.exports = {
  getProfile,
};