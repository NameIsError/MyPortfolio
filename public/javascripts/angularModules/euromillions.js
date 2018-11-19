var app = angular.module('euromillions', []);
var mysql = require('mysql');

app.controller('euromillionsCtrl', function($scope)
{
    var date = new Date();
    var day = date.getDate() < 10 ? "0" + date.GetDate : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    
    $scope.date = day + "-" + month + "-" + date.getFullYear(); 

    var con = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'FS7312kp20122017'
        }
    );

    con.connect(function(err)
    {
        if(err) throw err;

        var sqlQuery = 'SELECT * FROM testtable;';

        con.query(sqlQuery, function(err, result)
        {
            if(err) throw err;

            console.log("Result: " + result);
        })
    });
});