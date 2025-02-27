'use strict'

const { sendEmail } = require("../configs/init.nodemailer")
const { NotFoundError } = require("../core/error.response")
const templateModel = require("../models/template.model")
const { getTemplate } = require("./template.service")
const { replacePlaceholder } = require('../utils/index')

const sendEmailSignUp = async ({
    email = null
}) => {
    // get template
    const template = await getTemplate({
        tem_name: 'HTML_EMAL_TEMP_PASS'
    })

    if (!template) throw new NotFoundError('template not found')

    // replace 
    const content =  replacePlaceholder(template.tem_html, {
        password: email,
        link_login: `localhost:3000`
    })

    // send email
    sendEmail({
        receiver: email,
        subject: "Mật khẩu đăng nhập tạm thời",
        html: content
    }).catch(err => console.log(`Send Email Error:::`, err))
}

module.exports = {
    sendEmailSignUp
}