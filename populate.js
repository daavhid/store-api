// const mongoose = require('mongoose')
require('dotenv').config()
const connectDb = require('./Db/connection')
// const ConnectDb = require('./Db/connection')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        process.exit(0)
    }catch(error){
        console.log(error)
    }
}

start()