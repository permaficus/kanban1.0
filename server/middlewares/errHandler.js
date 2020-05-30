'use strict';

class Err extends Error {
  constructor({name, status, message}) {
    super(message)
    this.name = name
    this.status = status
  }

  static handler( err, req, res, next ) {
        console.log(err);
        if (err.status) {
            res.status(err.status).json({
                name: err.name,
                message: err.message
            })
        } else {
            if (err.name == `SequelizeValidationError`) {
                res.status(400).json({name:err.name, message: `Error Validating Credential` })
            } else {
                res.status(500).json({name: `InternalServerError`, message: `Internal Server Error`})
            }
        }
    }
}

module.exports = Err;