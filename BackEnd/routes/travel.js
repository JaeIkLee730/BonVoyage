var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    // prior connection make better performance
    host     : 'localhost',
    user     : 'root',
    password : 'ctvy',
    database : 'BonVoyage' // database name. not the table name
});

// getting certain user's travels
router.get('/user_travel/:user_no/:start_no/:display_no', function(req, res, next){

    var start_no = req.params.start_no ;
    var display_no = req.params.display_no ;
    var user_no = req.params.user_no ;

    var resultList = {
        travel_cnt : 0,
        travel_list : null
    }

    var sql1 = "select count(*) 'travel_cnt' from BonVoyage.travel where user_no=" + user_no ;

    var sql2 = "select * from BonVoyage.travel"
        + " where user_no=" + user_no
        + " order by travel_no desc"
        + " limit "
        + start_no
        + ","
        + display_no
        + ";" ;

    connection.query(sql1, [user_no], function(error, result, fields) {
        if( error ) throw error ;
        resultList.travel_cnt = result ;

        connection.query(sql2, [user_no], function(error, results, fields) {
            if( error ) throw error ;
            resultList.travel_list = results ;
            res.send(resultList) ;
        });
    });
});

// getting certain user's certain travel's wishes
router.get('/user_wish/:user_no/:start_no/:display_no', function(req, res, next){

    var user_no = req.params.user_no ;
    var start_no = req.params.start_no ;
    var display_no = req.params.display_no ;

    var resultList = {
        wish_cnt : 0,
        wish_list : null
    }

    var sql1 = "select count(*) 'wish_cnt' from BonVoyage.wish where user_no=" + user_no ;

    var sql2 = "select * from BonVoyage.wish"
        + " where user_no=" + user_no
        + " order by start_date asc"
        + " limit "
        + start_no
        + ","
        + display_no
        + ";" ;


    connection.query(sql1, [user_no], function(error, result, fields) {
        if( error ) throw error ;
        resultList.wish_cnt = result ;

        connection.query(sql2, [user_no], function(error, results, fields) {
            if( error ) throw error ;
            resultList.wish_list = results ;
            res.send(resultList) ;
        });
    });
});

// get all travels
router.get('/all', function(req, res, next){

    // board1
    var sql = "select * from BonVoyage.travel"
        + " order by travel_no desc ;"

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        res.send(result) ;
    });

});


// get category list
router.get('/category/', function(req, res, next){

    var sql = "select * from BonVoyage.category" ;

    connection.query(sql, function(error, results, fields) {
        if( error ) throw error ;
        res.send(results) ;
    });
}) ;

// get country list
router.get('/country/', function(req, res, next){

    var sql = "select * from BonVoyage.country" ;

    connection.query(sql, function(error, results, fields) {
        if( error ) throw error ;
        res.send(results) ;
    });
}) ;

// get city list
router.get('/city/:no', function(req, res, next){

    var country_no = req.params.no ;
    var sql = "select * from BonVoyage.city where country_no=?" ;

    connection.query(sql, [country_no], function(error, results, fields) {
        if( error ) throw error ;
        res.send(results) ;
    });
}) ;


// get in/out/ city, country
router.get('/setInOutCity/:no1/:no2/', function(req, res, next) {

    var in_city_no = req.params.no1 ;
    var out_city_no = req.params.no2 ;

    var nameList = {
        in_country: null,
        in_city: null,
        out_country: null,
        out_city: null
    }

    // in-country name
    var sql1 = "SELECT name FROM BonVoyage.country"
                + " WHERE country_no="
                + "(SELECT country_no FROM BonVoyage.city"
                + " WHERE city_no=?) ;" ;

    console.log("sql1 : ",sql1) ;

    // in-city name
    var sql2 = "SELECT name FROM BonVoyage.city"
                + " WHERE city_no=? ;" ;

    console.log("sql2 : ",sql2) ;
    // when concat the strings like this, be careful about sapcing

    // out-country name
    // out-city name


    connection.query(sql1, [in_city_no], function(error, result, fields){
        if( error ) throw error ;
        nameList.in_country = result ;

        connection.query(sql2, [in_city_no], function(error, result, fields){
            if( error ) throw error ;
            nameList.in_city = result ;

            connection.query(sql1, [out_city_no], function(error, result, fields) {
                if ( error ) throw error;
                nameList.out_country = result;

                connection.query(sql2, [out_city_no], function (error, result, fields) {
                    if ( error ) throw error;
                    nameList.out_city = result;
                    res.send(nameList);
                });
            });
        });
    });

}) ;


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

// save the travel
router.post('/saveTravel/', function(req, res, next){

    var user_no = req.body.user_no ;
    var title = req.body.title ;
    var description = req.body.description ;
    var start_date = req.body.start_date ;
    var end_date = req.body.end_date ;
    var no_companion = req.body.no_companion ;
    var in_city_no = req.body.in_city_no ;
    var out_city_no = req.body.out_city_no ;

    var sql = "insert into BonVoyage.travel"
        + " (user_no, title, description, start_date, end_date, no_companion, in_city_no, out_city_no)"
        + " values (?,?,?,?,?,?,?,?) ;"

    connection.query(sql, [user_no, title, description, start_date, end_date, no_companion, in_city_no, out_city_no], function(error, results, fields){
        if( error ) throw error ;
        res.send(results) ;
    });
});

// save the travel
router.post('/saveWish/', function(req, res, next){

    var user_no = req.body.user_no ;
    var travel_no = req.body.travel_no ;
    var city_no = req.body.city_no ;
    var start_date = req.body.start_date ;
    var end_date = req.body.end_date ;
    var category_no = req.body.category_no ;
    var cost = req.body.cost ;
    var title = req.body.title ;
    var description = req.body.description ;

    var sql = "insert into BonVoyage.wish"
        + " (user_no, travel_no, city_no, start_date, end_date, category_no, cost, title, description)"
        + " values (?,?,?,?,?,?,?,?,?) ;"

    connection.query(sql, [user_no, travel_no, city_no, start_date, end_date, category_no, cost, title, description], function(error, results, fields){
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