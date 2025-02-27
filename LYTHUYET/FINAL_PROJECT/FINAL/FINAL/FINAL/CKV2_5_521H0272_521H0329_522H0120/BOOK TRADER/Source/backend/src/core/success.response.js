'use strict'


const {
    ReasonPhrases, StatusCodes
} = require('../utils/httpStatusCode')


class SuccessResponse{
    constructor({ message, statusCode = StatusCodes.OK, reason = ReasonPhrases.OK, metadata = {} }) {
        this.message = !message ?  ReasonStatusCode : message
        this.status = statusCode
        // this.reason = reason
        this.metadata = metadata
    }

    send( res, headers = {} ) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor( { message, metadata } ) {
        super({ message, metadata })
    }

}

class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCodes.CREATED, reason = ReasonPhrases.CREATED, metadata }) {
        super({ message, statusCode, reason, metadata })
    }
}

module.exports = {
    OK, CREATED, SuccessResponse
}