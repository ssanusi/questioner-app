const authorise = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized Admin Route" });
  }
  return next();
};

export default authorise;
