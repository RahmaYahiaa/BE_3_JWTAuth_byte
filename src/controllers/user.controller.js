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

const getAdminDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Admin Dashboard',
    data: {
      userId: req.user.id,
      role: req.user.role,
    },
  });
};

module.exports = {
  getProfile,
  getAdminDashboard,
};