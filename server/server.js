'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Dependencies =======================


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var session;
var user;

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = (0, _express2.default)();
    }

    _createClass(Server, [{
        key: 'configureApp',
        value: function configureApp() {
            this.app.set('port', process.env.PORT || 3000);
            this.app.use((0, _morgan2.default)('dev'));
            this.app.use((0, _compression2.default)());
            this.app.use((0, _helmet2.default)());
            this.app.use((0, _cors2.default)());
            this.app.use(_bodyParser2.default.json());
            this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
            this.app.use((0, _expressSession2.default)({
                secret: 'd*o*p*e*m*u*s*i*c',
                resave: false,
                saveUninitialized: false
            }));
            this.app.use('/', _express2.default.static(_path2.default.join(__dirname + '/../public')));
        }
    }, {
        key: 'configureCORS',
        value: function configureCORS() {
            this.app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

                res.setHeader('Cache-Control', 'no-cache');
                next();
            });
        }
    }, {
        key: 'configureRoutes',
        value: function configureRoutes() {
            this.app.get('/', function (req, res, next) {
                res.sendfile(_path2.default.join(__dirname + 'index.html'));
            });
            this.app.get('/login', function (req, res) {
                session = req.session;
                if (session.uniqueID) {
                    res.redirect('/redirects');
                }
                res.sendFile(_path2.default.join(__dirname + './../public/login.html'));
            });
            this.app.post('/login', function (req, res) {
                session = req.session;
                if (session.uniqueID) {
                    res.redirect('/redirects');
                }
                session.uniqueID = req.body.username;
                res.redirect('/redirects');
            });
            this.app.get('/logout', function (req, res) {
                req.session.destroy();
                res.redirect('/login');
            });
            this.app.get('/admin', function (req, res) {
                session = req.session;
                if (session.uniqueID != 'admin') {
                    res.end('Unauthorized access');
                }
                res.sendFile(_path2.default.join(__dirname + './../public/admin.html'));
            });
            this.app.get('/redirects', function (req, res) {
                session = req.session;
                if (session.uniqueID == 'admin') {
                    res.redirect('/admin');
                } else {
                    res.end(req.session.uniqueID + ' no found <a href="/logout"> Salir </a>');
                }
            });
        }
    }, {
        key: 'listen',
        value: function listen(port) {
            this.app.listen(port, function () {
                console.log('Server satarted: http://localhost:' + port + '/');
            });
        }
    }, {
        key: 'run',
        value: function run() {
            this.configureApp();
            this.configureCORS();
            this.configureRoutes();
            this.listen(this.app.get('port'));
        }
    }]);

    return Server;
}();

exports.default = Server;