'use strict'

const mongoose = require('mongoose')
const {db: {  host, name, port }} = require('../configs/config.mongodb')
const connectString =  `mongodb://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {  // dev
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
            // In lại tất cả hoạt động khi query
            // Dev -> in log, Product -> không in
        }

        mongoose.connect(connectString, {
            maxPoolSize: 80
        }).then(_ => console.log("Successfully connected MongoDB"))
        .catch(err => console.log("Failed to connect MongoDB"))
    }

    static getInstance(){
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb