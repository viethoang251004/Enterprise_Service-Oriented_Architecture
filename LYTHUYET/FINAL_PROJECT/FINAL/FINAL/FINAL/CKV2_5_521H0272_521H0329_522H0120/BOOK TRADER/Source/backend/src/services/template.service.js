'use strict'

const templateModel = require("../models/template.model")
const { htmlEmailToken } = require('../utils/confirm.template')

const newTemplate = async({
    tem_name,
    tem_html,
    tem_id = 0
}) => {
    // 
    const newTem = await templateModel.create({
        tem_id,
        tem_name,
        tem_html: htmlEmailToken()
    })
    return newTem
}

const getTemplate = async({ tem_name }) => {
    const template = await templateModel.findOne({tem_name})
    return template
}

module.exports = {
    newTemplate,
    getTemplate
}