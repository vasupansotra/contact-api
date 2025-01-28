const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const connectWithDatatbase = async()=>{
    try{
        await mongoose.connect('mongodb+srv://vasu123:Vasu1419@contactapp.lcztz.mongodb.net/?retryWrites=true&w=majority&appName=ContactApp')
            console.log('connected with database')
    }
    catch(err){
        console.log('something went wrong')
        console.log(err)
    }
}
connectWithDatatbase()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const contactRoute = require('./routes/contact')
app.use('/contact',contactRoute)

module.exports = app;
