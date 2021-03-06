/**
 * Created by Daniel on 12/7/2016.
 */
var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');
var resume_dal = require('../model/resume_dal');


// View All resumes
router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.getById(req.query.account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

// Return the add a new resume form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    resume_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeAdd', {'resume': result});
        }
    });

});

// View the account for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.account_name == null) {
        res.send('Account Name must be provided.');
    }
    else if(req.query.resume_id == null) {
        res.send('At least one resume must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.account_id == null) {
        res.send('A account id is required');
    }
    else {
        account_dal.edit(req.query.account_id, function(err, result){
            console.log(result);
            res.render('account/accountUpdate', {account: result[0][0], resume: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.account_id == null) {
        res.send('An account id is required');
    }
    else {
        account_dal.getById(req.query.account_id, function(err, account){
            school_dal.getAll(function(err, school) {
                res.render('account/accountUpdate', {account: account[0], resume: resume});
            });
        });
    }

});

router.get('/update', function(req, res) {
    resume_dal.update(req.query, function(err, result){
        res.redirect(302, '/account/all');
    });
});

// Delete a account for the given account_id
router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

module.exports = router;