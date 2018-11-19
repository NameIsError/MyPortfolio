const rp = require('request-promise');
const cheerio = require('cheerio');
const date = require('date-and-time');

const options = {
    uri : 'https://www.euro-millions.com/pt/arquivo-de-resultados-2004',
    transform: function (body) {
        return cheerio.load(body);
    }
}

rp(options)
    .then(($) =>
    {
        console.log("Success");
        processData($);
    })
    .catch((err) =>
    {
        console.log("Failure");
        console.log(err);
    });

function processData($)
{
    var archivesList = $('.archives');

    archivesList.each(function(i, elem)
    {
        var dateObject = getDate($, $(this));
        
        //TODO: Get numbers
        var numbers = $(this).find('.balls');

    });
}

//Returns date object with date of euromillions date
function getDate($, archive)
{
    var title = $(archive).find('.title');

    var href = title[0].attribs.href;

    var dateString = href.split('/');

    dateString = dateString[dateString.length - 1];

    var dateObject = date.parse(dateString, 'DD-MM-YYYY');

    console.log(dateObject);
    
    return dateObject;
}