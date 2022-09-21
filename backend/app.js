const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOURL } = require('./keys')
const protect= require('./auth/require.login')


app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));
app.use(protect());

const api = require('./api')
app.use('/api',api)


mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on('error', (err) => {
    console.log("error while connecting :", err)
}) 

module.exports = app