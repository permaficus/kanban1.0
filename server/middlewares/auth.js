require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_TOKEN;
const Err = require('./errHandler.js');
const { Task } = require("../models");
const { Op } = require('sequelize');

module.exports =  {
  Authentication: function(req, res, next) {
    const { authorization } = req.headers;
    jwt.verify(authorization, secretKey, function(err, decoded) {
        if (err)
            throw new Err({name: 'IAT', status: 401, message: 'Invalid Access Token'})
        else {
            req['decoded'] = decoded;
            next();
        }
    })
  },

  Authorization: function(req, res, next) {

    const { params: { id }, decoded: { UserId } } = req
    
    Task.findOne({where: { [Op.and]: [{ id: id }, { UserId: UserId }] }})
      .then(result => {

        if (result) {
          next()
        } else {
          throw new Err({
            name: '400-AccessDenied',
            status: 400,
            message: 'Access Denied'
          })
        }
      })
      .catch(next)
  }
}