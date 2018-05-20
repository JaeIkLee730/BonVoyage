var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    // prior connection make better performance
    host     : 'localhost',
    user     : 'root',
    password : 'ctvy',
    database : 'BonVoyage'
    // database name
});

// counting num of members
router.get('/', function(req, res, next){

  // var sql = "select * from linux.users" ;

  var sql = "select count(*) 'cnt' from BonVoyage.users" ;
  //  count(*) 라는 이름으로 넘어온다 - 불편 - cnt라는 이름으로 바꿔서 넘겨준다

  connection.query( sql, function(error, result, fields){
    if(error) throw error ;
    res.send(result) ;
  });
});

// login
router.post('/login/', function(req, res){
    var id = req.body.id ;
    var pwd = req.body.pwd ;

    console.log(req.body) ;

    var sql = "select * from BonVoyage.users where id=? and pwd=? ;" ;

    connection.query(sql, [id, pwd], function(error, result){
       if( result.length === 0 ){
           res.sendStatus(404) ;
       } else {
           res.status(200).send(result[0]) ;
       }
    });
});

// join
router.post('/join/', function(req, res, next){
    var name = req.body.name ;
    var id = req.body.id ;
    var pwd = req.body.pwd ;
    var age = req.body.age ;
    var gender = req.body.gender ;
    var birth = req.body.birth ;
    var phone = req.body.phone ;
    var email = req.body.email ;

    console.log(req.body) ;

    var sql = "insert into BonVoyage.users (name, id, pwd, age, gender, birth, phone, email) values (?,?,?,?,?,?,?,?)" ;

    connection.query(sql, [name, id, pwd, age, gender, birth, phone, email], function(error, result){
        if( error ){
            throw error ;
        } else {
            res.send(result) ;
        }
    });
});

// modify
router.post('/modify/:no', function(req, res, next) {
    // '/' : URI
    var user_no = req.params.no ;
    var name = req.body.name ;
    var id = req.body.id ;
    var pwd = req.body.pwd ;
    var user = {
        user_no : user_no,
        name : name,
        id : id,
        pwd : pwd
    }

    var sql = "update BonVoyage.users "
        + "set name=?, "
        + "id=?, "
        + "pwd=? "
        + "where user_no="
        + user_no
        + ";" ;

    console.log("sql : ",sql);

    connection.query(sql, [name, id, pwd], function (error, results, fields) {
        if (error) throw error;
        res.send(user);
    });
});

// redundancy check
router.post('/redundancy/', function(req, res){
    var id = req.body.id ;

    console.log(req.body) ;

    var sql = "select * from BonVoyage.users where id=? ;" ;

    connection.query(sql, [id], function(error, result){
        if( result.length === 0 ){
            res.send(result) ;
        } else {
            res.status(200).send(result[0]) ;
        }
    });
});

// delete member, withdrawal
router.delete('/:no', function(req, res) {
   var user_no = req.params.no ;
   var sql = "delete from BonVoyage.users where user_no=?"

    connection.query(sql, [user_no], function(error, result, fields) {
       if(error) throw error
       res.send(result) ;
    });
});

module.exports = router;
