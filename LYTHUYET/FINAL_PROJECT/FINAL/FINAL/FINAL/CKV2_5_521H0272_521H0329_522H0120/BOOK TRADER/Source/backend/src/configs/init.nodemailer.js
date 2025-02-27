'use strict'

const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config

const CLIENT_ID = process.env.EMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET
const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN
const EMAIL = process.env.USER_EMAIL

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const getAccessToken = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        return accessToken
    } catch (error) {
        console.log(`GG API ACCESS TOKEN ERROR::`, error)
    }
}

const access_token = getAccessToken()

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token
    }
})

const sendEmail = async ({receiver, subject, html}) => {
    const info = await transport.sendMail({
        from: '"Booker 👻" <my.ngngia@gmail.com>', 
        to: receiver, 
        subject: subject + "✔",
        text: "", 
        html: html,
    })
    console.log(`SEND EMAIL:::`, info);
}

module.exports = {sendEmail}


