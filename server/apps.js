const express = require('express');
const server = new express();
const cors = require('cors');
const routes = require('./router')
const errHandler = require('./middlewares/errHandler')

server.use(express.urlencoded({extended: true}));
server.use(express.json())
server.use(cors())
server.use(routes)
server.use(errHandler.handler)
server.listen(3000, () => console.log('Listening on port 3000'))
