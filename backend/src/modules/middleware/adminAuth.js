const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'You need to login to view this content.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);

    req.user = decoded; // attach user

    if (req.user.role !== 'admin') {
      console.log(req.user);
      return res.status(403).json({ message: 'Admin access only.' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
