const routes = require('express').Router();
const auth = require("../middlewares/auth");
const { TaskController, UserController } = require('../controllers')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

routes.get('/task', auth.Authentication, TaskController.taskList);
routes.post('/task', auth.Authentication, TaskController.newTask)
routes.put('/task/:id', auth.Authentication, TaskController.updateTask)
routes.delete('/task/:id', auth.Authentication, TaskController.deleteTask)

module.exports = routes