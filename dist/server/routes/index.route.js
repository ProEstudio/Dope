'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies =======================
var router = (0, _express.Router)();

// GET /health-check - Check service ===

// routes at /users ====================
router.use('/users', _user2.default);

// routes at /auth =====================

// Router exports ======================
exports.default = router;