const errors = {
  ValidationError: 400,
  NotFoundError: 400,
  UserAlreadyExistsError: 409,
};

const errorHandlerMiddleware = async ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  return res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;
