'use strict'

const { Types } = require("mongoose")

// array -> object
const getSelectedData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1] ))
}

const unGetSelectData  = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0] ))
}

const removeUndefinedObj = obj => {
    Object.keys(obj).forEach( k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}

const convertToObjectMongoDB = id => Types.ObjectId(id)

const updateNestedObjectParser = obj => {
    const final = {}
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] == 'Object' && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k])
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = res[a]
            })
        }else {
            final[k] = obj[k]
        }
    })
    return final
}

module.exports = {
    getSelectedData,
    unGetSelectData,
    removeUndefinedObj,
    updateNestedObjectParser,
    convertToObjectMongoDB
}