const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

module.exports = { isTokenIncluded };
