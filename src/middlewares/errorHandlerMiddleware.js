const errors = {
  ValidationError: 400,
  NotFoundError: 400,
  UserAlreadyExistsError: 409,
  TokenNotFoundError: 401,
  UserNotFoundError: 404,
  InvalidTokenError: 401,
  CategoryNotFoundError: 400,
  PostNotFoundError: 404,
  UserUnauthorizedError: 401,
};

const errorHandlerMiddleware = async ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.status(500).json({ message });
  return res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;
