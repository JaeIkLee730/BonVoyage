var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    // prior connection make better performance
    host     : 'localhost',
    user     : 'root',
    password : 'ctvy',
    database : 'linux'
});

// getting list of the posts in a board
router.get('/:no/:start_no/:display_no', function(req, res, next){

    var board_no = req.params.no ;
    var start_no = req.params.start_no ;
    var display_no = req.params.display_no ;

    var resultList = {
        post_cnt : 0,
        post_list : null
    }

    var sql1 = "select count(*) 'post_cnt' from linux.board"
        + board_no ;

    console.log("sql1 : ",sql1) ;

    var sql2 = "select * from linux.board"
        + board_no
        + " order by post_no desc"
        + " limit "
        + start_no
        + ","
        + display_no
        + ";" ;

    connection.query(sql1, function(error, result, fields) {
        if( error ) throw error ;
        resultList.post_cnt = result ;

        connection.query(sql2, function(error, results, fields) {
            if( error ) throw error ;
            resultList.post_list = results ;
            res.send(resultList) ;
        });
    });
});

// get all boards
router.get('/all', function(req, res, next){

    var start_no = 0;
    var display_no = 4;
    var resultList = new Array(3) ;

    // board1
    var sql = "select * from linux.board"
        + 1
        + " order by post_no desc"
        + " limit "
        + start_no
        + ","
        + display_no
        + ";" ;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        resultList[0] = result;

        // board2
        var sql = "select * from linux.board"
            + 2
            + " order by post_no desc"
            + " limit "
            + start_no
            + ","
            + display_no
            + ";" ;

        connection.query(sql, function (error, result, fields) {
            if (error) throw error;
            resultList[1] = result;

            // board3
            var sql = "select * from linux.board"
                + 3
                + " order by post_no desc"
                + " limit "
                + start_no
                + ","
                + display_no
                + ";" ;

            connection.query(sql, function (error, result, fields) {
                if (error) throw error;
                resultList[2] = result;
                res.send(resultList) ;
            });
        });
    });

});

// searching posts by keyword - by title / by writer id
router.post('/search/:no', function(req, res, next){

    var board_no = req.params.no ;
    var post_title = req.body.post_title ;
    var user_id = req.body.user_id ;
    var searchList = {
        byTitle: null,
        byUser: null
    }

    console.log(req.body) ;

    var sql1 = "select * from linux.board"
                + board_no
                + " where post_title like concat('%', ?, '%') order by post_no desc;" ;

    var sql2 = "select * from linux.board"
                + board_no
                + " where user_id like concat('%', ?, '%') order by post_no desc;" ;

    connection.query(sql1, [post_title], function(error, results, fields){
        if( error ) throw error ;
        searchList.byTitle = results ;

        connection.query(sql2, [user_id], function(error, results, fields){
            if( error ) throw error ;
            searchList.byUser = results ;
            res.send(searchList) ;
        });
    });
});

// posting a post
router.post('/post/:no', function(req, res, next){

    var board_no = req.params.no ;
    var user_id = req.body.user_id ;
    var post_title = req.body.post_title ;
    var post_contents = req.body.post_contents

    console.log(req.body) ;

    var sql = "insert into linux.board"
                + board_no
                + " (user_id, post_title, post_contents) values (?,?,?) ;"

    connection.query(sql, [user_id, post_title, post_contents], function(error, results, fields){
        if( error ) throw error ;
        res.send(results) ;
    });
});

// modifying post
router.put('/:no', function(req, res, next) {
    // '/' : URI
    var board_no = req.params.no ;
    var post_title = req.body.post_title ;
    var post_contents = req.body.post_contents ;
    var post_no = req.body.post_no ;

    var sql = "update linux.board"
        + board_no
        + " set post_title=?, "
        + "post_contents=?, "
        + "written_date=now() "
        + "where post_no=?; " ;

    connection.query(sql, [post_title, post_contents, post_no], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// deleting a post
router.delete('/:board_no/:post_no', function(req, res, next) {

    var board_no = req.params.board_no ;
    var post_no = req.params.post_no ;
    var sql = "delete from linux.board"
                + board_no
                + " where post_no=?" ;

    connection.query(sql, [post_no], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});


module.exports = router;