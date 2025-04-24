exports.onlyClients = (req, res, next) => {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can perform this action' });
    }
    next();
  };
  
  exports.onlyCreators = (req, res, next) => {
    if (req.user.role !== 'creator') {
      return res.status(403).json({ message: 'Only creators can perform this action' });
    }
    next();
  };
  