'use strict'

const Hashing = require('../helpers/hashing');
const Err = require('../middlewares/errHandler');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretToken = process.env.JWT_TOKEN;
const { User, Task } = require('../models')
const { Op } = require('sequelize')

class TaskController {

    static taskList = (req, res, next) => {

        const { decoded : { UserId }} = req;

        Task.findAll({include: [{model: User}], where: { UserId }})
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                }
            })
            .catch(next)

    }

    static newTask = (req, res, next) => {

        const { decoded: {UserId}, body: { title, description } } = req;

        Task.create({
            title: title,
            description: description,
            UserId: UserId
        })
        .then(result => res.status(200).json(result))
        .catch(next)

    }

    static updateTask = (req, res, next) => {

        const { params: { id }, body: { category } } = req;

        Task.update({
            // title: title,
            category: category
        }, {where: { id: id }})
        .then (result => res.status(200).json(result))
        .catch(next)
    }

    static deleteTask = (req, res, next) => {
        
        const { params: { id }} = req;

        Task.destroy({where: { id }})
            .then(result => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(401).json({Error: `Task with ID: ${id} doesn't exist`})
                }
            })
            .catch(next)
    }

}

class UserController {

    static register (req, res, next) {

        const { email, password } = req.body;
        let username;

        if (email.indexOf('@') == -1) {
          username = email;
          email = `${username}@${username}.mail`
        } else {
            username = email.slice(0, email.indexOf('@'))
        }
    
        User.findOne({where: { [Op.or]: [{ username: username }, { email: email }]}})
          .then(user => {
    
            if (user) {
              throw new Err({
                name: 'UserExist',
                status: 400,
                message: 'This email or username already taken'
              })
            } else {
              return Hashing.hashPassword(password)
            }
          })
          .then(password => {
            return User.create({ username, email, password })
          })
          .then(user => {
            res.status(201).json({ id: user.id, username: username, email: user.email })
          })
          .catch(err => { throw new Err({ name: 'InternalServerError', status: 500, message: err })})
      }
    
      static login (req, res, next) {
        const { email, password } = req.body
        let data, username;

        console.log(req.body)

        if (email.indexOf('@') == -1) {
          username = email;
          email = `${username}@${username}.mail`
        } else {
            username = email.slice(0, email.indexOf('@'))
        }
    
        User.findOne({where: { [Op.or]: [{username: username}, {email: email}] }})
          .then(user => {
            if (!user) {
              throw new Err({
                name: 'InvalidCredentials',
                status: 400,
                message: 'Invalid Email or Password'
              })
            }
    
            data = user;
            return Hashing.doCompare(password, user.password)
          })
    
          .then(result => {
            if (result) {
              const access_token = jwt.sign({
                UserId: data.id,
                email: data.email,
                username: data.username
              }, secretToken);

              const Username = data.username
              
              res.status(200).json({ access_token, Username })
            } else {
              throw new Err({
                name: 'InvalidCredentials',
                status: 400,
                message: 'Invalid Email or Password'
              })
            }
          })
          .catch(next)
      }
}

module.exports = { TaskController, UserController }