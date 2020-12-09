const express = require('express');
const morgan = require('morgan');
const render = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const taskRouter = require('./routes/taskRoutes');

const app = express();


// DATA BASE CONNECT  
const dbURI = 'mongodb+srv://admin:admin1234@cluster0.xrl0q.mongodb.net/NodeToDoList?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Data base connection succed');
        app.listen(3000)
    })
    .catch(err => console.log(err));

// VIEW ENGINE ON 
app.set('view engine', 'ejs');

// MIDDLEWARE AND PUBLIC
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static('public'));

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// REQUESTS
app.get('/home', (req, res) => {
    res.redirect('/');
});

app.use('/', taskRouter);

// ERROR 404
app.use((req, res) => {
    let page = req.originalUrl;
    res.status(404).render('errors/404', { page });
})
