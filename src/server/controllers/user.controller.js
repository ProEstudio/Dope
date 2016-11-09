// Dependencies =======================
import mongojs from 'mongojs'
const db = mongojs('mongodb://jairperezs:D1e560*9c@ds137197.mlab.com:37197/legacydb', ['companies'])

// Find All ===========================
function findAll(req, res, next){
    db.companies.find((err, companies) => {
        if(err){
            res.send(err)
        }
        res.json(companies)
    });
}

// Single Find =========================
function findOne(req, res, next){
    db.companies.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, company) => {
        if(err){
            res.send(err)
        }
        res.json(company)
    });
}

// Create ===============================
function Create(req, res, next){
    var company = req.body
    db.companies.save(company, (err, company) => {
        if(err){
            res.send(err)
        }
        res.json(company)
    });
}

// Delete ================================
function Delete(req, res, next){
    db.companies.remove({_id: mongojs.ObjectId(req.params.id)}, (err, company) => {
        if(err){
            res.send(err)
        }
        res.json(company)
    });
}

// Update ================================
function Update(req, res, next){
    var company = req.body
    var updCompany = {}

    if(company.name){
        updCompany.name = company.name
    }

    if(company.description){
        updCompany.description = company.description
    }
    
    if(!updCompany){
        res.status(400)
        res.json({
            "error":"Bad Data"
        })
    }else{
        db.companies.update({_id: mongojs.ObjectId(req.params.id)},updCompany, {}, (err, company) => {
            if(err){
                res.send(err)
            }
            res.json(company)
        })
    }    
}

export default { findAll , findOne, Create , Delete, Update }