const userAuth = (req, res, next) => {
  const authHeader = 'xyze'; // Example static auth header for demonstration
  if (authHeader === 'xyz') {
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = userAuth;
// Middleware to check user authentication