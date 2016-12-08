/**
 * Created by Daniel on 12/7/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view resume_view as
 select r.resume_name, s.school_name, c.company_name, sk.name from resume r
 join resume_school rs on rs.resume_id = r.resume_id
 join school s on s.school_id = rs.school_id
 join resume_company rc on r.resume_id = rc.company_id
 join company c on c.company_id = rc.company_id
 join resume_skill rsk on rsk.resume_id = r.resume_id
 join skill sk on sk.skill_id = rsk.skill_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT * FROM resume_view WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (resume_name, user_account_id) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.resume_name, params.user_account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(resume_id, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE resume SET resume_name = ?, user_account_id = ? WHERE resume_id = ?';
    var queryData = [params.resume_name, params.user_account_id, params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS resume_getinfo;

 DELIMITER //
 CREATE PROCEDURE resume_getinfo (resume_id int)
 BEGIN
 SELECT * FROM resume WHERE resume_id = resume_id;
 SELECT a.*, resume_id FROM user_account a
 LEFT JOIN resume s on s.user_account_id = a.user_account_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL resume_getinfo (4);

 */

exports.edit = function(resume_id, callback) {
    var query = 'CALL resume_getinfo(?)';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};