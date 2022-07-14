require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { 
  throwTokenNotFoundError,
  throwUserNotFoundError, 
  throwInvalidTokenError } = require('./_services');

const authServices = {
  async createToken(user) {
    const { password: _, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser }, process.env.JWT_SECRET, { 
      expiresIn: '15m',
      algorithm: 'HS256',
     });
    
     return token;
  },

  async validateToken(token) {
    try {
      if (!token) return throwTokenNotFoundError('Token not found');
      const { data: { email } } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email } });
      if (!user) return throwUserNotFoundError('User not found');
    } catch (err) {
      if (err.name === 'JsonWebTokenError') throwInvalidTokenError('Expired or invalid token');
      throw err;
    }
  },
};

module.exports = authServices;
