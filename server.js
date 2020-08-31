const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')
const path = require('path')
require('dotenv').config()

const bodyParser = require('body-parser')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    next();
});
app.use(bodyParser.json())

app.use('/api/', userRoutes)

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}


mongoose
    .connect(`mongodb+srv://${process.env.DB_CONNECTION}@cluster0.qbyvo.mongodb.net/expensetracker?retryWrites=true&w=majority`,{
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => app.listen(process.env.PORT || 5000))
    .catch(err => console.log(err.message));
