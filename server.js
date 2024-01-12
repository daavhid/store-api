
const express = require('express');
require('dotenv').config()
require('express-async-errors')

const errorMiddleWare = require('./middleware/error');
const bodyParser = require('body-parser');
const errorHandlingMiddleware = require('./middleware/error');
const connectDb = require('./Db/connection')
const productsRouter = require('./routes/productsRouter')

const app = express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Store Home PAge')
})


app.use('/api/v1/products',productsRouter)

// Products Route

app.use(errorHandlingMiddleware)

const PORT = process.env.PORT  || 3000

const start = async()=>{
    try{
        //connect to db
        await connectDb(process.env.MONGO_URI)
        
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT} `)
        })
    }catch(error){
        console.log(error)
    }
}

start()

