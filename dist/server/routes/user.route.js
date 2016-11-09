'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies =======================
var userRoutes = (0, _express.Router)();

// /api/user/ API Page =================
userRoutes.route('/').get(_user2.default.findAll).post(_user2.default.Create);

// /api/user/:Id API Page ==============    
userRoutes.route('/:id').get(_user2.default.findOne).delete(_user2.default.Delete).put(_user2.default.Update);

// userRouter exports ======================
exports.default = userRoutes;