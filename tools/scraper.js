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

        var numbers = getNumbers($, $(this));

        var stars = getStars($, $(this));

        var contest = 
        {
            date: dateObject,
            numbers: numbers,
            stars: stars
        };

        console.log(contest);

    });
}

function getNumbers($, archive)
{
    var ballElements = $(archive).find('.ball');

    var ballList = [];

    for(var i = 0; i< ballElements.length; i++)
    {
        ballList.push(ballElements[i].children[0].data);
    }

    return ballList;
}

function getStars($, archive)
{
    var starElements = $(archive).find('.lucky-star');

    var starList = [];

    for(var i = 0; i< starElements.length; i++)
    {
        starList.push(starElements[i].children[0].data);
    }

    return starList;
}

//Returns date object with date of euromillions
function getDate($, archive)
{
    var title = $(archive).find('.title');

    var href = title[0].attribs.href;

    var dateString = href.split('/');

    dateString = dateString[dateString.length - 1];

    var dateObject = date.parse(dateString, 'DD-MM-YYYY');
    
    return dateObject;
}