var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')
var User = require('./models/user')

var app = express();

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "d*o*p*e*1*2*3",
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'jade');

app.get(('/') , function(req, res){
    res.render('index')
});

app.get(('/signup') , function(req, res){
    User.find(function(err,doc){
        res.render('signup')
    })
});

app.get(('/login') , function(req, res){
    res.render('login')
});

app.post(('/users') , function(req, res){
    var user = new User({email: req.body.email , username: req.body.username, password: req.body.password});

    user.save(function(){
        res.redirect('/login')
    })
});

app.post(('/sessions') , function(req, res){
    User.findOne({username: req.body.username, password: req.body.password},function(err,user){
        req.session.user_id = user._id;
        res.redirect('/app')
    })
});

app.get(('/logout'), function(req, res){
    req.session.destroy();
    res.redirect('/login')
})
app.use('/app', session_middleware)
app.use('/app', router_app)

app.listen(8080);