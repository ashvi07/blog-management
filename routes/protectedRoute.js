const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected route
router.get('/', authMiddleware, (req, res) => {
  // Access user information from req.user
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
