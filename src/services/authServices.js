require('dotenv').config();
const jwt = require('jsonwebtoken');

const authServices = {
  async createToken(user) {
    const { password: _, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser.dataValues }, process.env.JWT_SECRET, { 
      expiresIn: '5m',
      algorithm: 'HS256',
     });
    
     return token;
  },
};

module.exports = authServices;
