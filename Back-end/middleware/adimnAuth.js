const AdminAuth = (req, res, next) => {
  const { admin } = req.headers;
  if (admin) next();
  else {
    res.statusCode = 403;
    res.send({
      message: "you are not allowed to access this page",
    });
  }
};

module.exports = AdminAuth;
