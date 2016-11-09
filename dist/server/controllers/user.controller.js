'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongojs = require('mongojs');

var _mongojs2 = _interopRequireDefault(_mongojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _mongojs2.default)('mongodb://jairperezs:D1e560*9c@ds137197.mlab.com:37197/legacydb', ['companies']);

// Find All ===========================
// Dependencies =======================
function findAll(req, res, next) {
    db.companies.find(function (err, companies) {
        if (err) {
            res.send(err);
        }
        res.json(companies);
    });
}

// Single Find =========================
function findOne(req, res, next) {
    db.companies.findOne({ _id: _mongojs2.default.ObjectId(req.params.id) }, function (err, company) {
        if (err) {
            res.send(err);
        }
        res.json(company);
    });
}

// Create ===============================
function Create(req, res, next) {
    var company = req.body;
    db.companies.save(company, function (err, company) {
        if (err) {
            res.send(err);
        }
        res.json(company);
    });
}

// Delete ================================
function Delete(req, res, next) {
    db.companies.remove({ _id: _mongojs2.default.ObjectId(req.params.id) }, function (err, company) {
        if (err) {
            res.send(err);
        }
        res.json(company);
    });
}

// Update ================================
function Update(req, res, next) {
    var company = req.body;
    var updCompany = {};

    if (company.name) {
        updCompany.name = company.name;
    }

    if (company.description) {
        updCompany.description = company.description;
    }

    if (!updCompany) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.companies.update({ _id: _mongojs2.default.ObjectId(req.params.id) }, updCompany, {}, function (err, company) {
            if (err) {
                res.send(err);
            }
            res.json(company);
        });
    }
}

exports.default = { findAll: findAll, findOne: findOne, Create: Create, Delete: Delete, Update: Update };