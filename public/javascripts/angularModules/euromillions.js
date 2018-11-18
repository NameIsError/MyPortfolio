var app = angular.module('euromillions', []);

app.controller('euromillionsCtrl', function($scope)
{
    var date = new Date();
    var day = date.getDate() < 10 ? "0" + date.GetDate : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    
    $scope.date = day + "-" + month + "-" + date.getFullYear(); 
});