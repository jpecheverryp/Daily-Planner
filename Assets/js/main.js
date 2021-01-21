// Import the luxon Datetime object as Datetime 
var DateTime = luxon.DateTime;
var currentTime = DateTime.local();

// Function that takes a weekday number and returns the name of the day
// Starts with 1 = Monday, and Sunday as a 7
function getWeekDay(weekDayNumber) {
    switch (weekDayNumber) {
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        case 7:
            return 'Sunday';
        default:
            break;
    }
}
// Starts with 1 as January
// Returns the name of the month using the number of it
function getMonth(monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            break;
    }
}

// Returns the suffix of the day
function getSuffix(dayNumber) {
    // Last number is used to identify the last digit of a number
    var lastNumber = dayNumber % 10;
    // Exceptions is used to assign th to 11, 12 and 13
    var exceptions = dayNumber % 100;

    if (lastNumber === 1 && exceptions !== 11) {
        return 'st';
    }
    if (lastNumber === 2 && exceptions !== 12) {
        return 'nd';
    }
    if (lastNumber === 3 && exceptions !== 13) {
        return 'rd';
    }
    return 'th';
}

var weekday = getWeekDay(currentTime.weekday)
var month = getMonth(currentTime.month);
var day = currentTime.day;
var suffix = getSuffix(currentTime.day);

$('#currentDay').text(`${weekday}, ${month} ${day}${suffix}`);

//------------- Time Blocks Generator -----------

function createRow(hour) {

    var displayHour = hour;

    var row = $('<div>');
    row.addClass('row');
    row.attr('data-hour', hour)
    $('.container').append(row);

    if(hour < 12) {
        var amPm = ' AM';
    } else {
        var amPm = ' PM';
    }

    if (amPm === ' PM' && hour !== 12){
        displayHour = hour - 12;
    }

    var hourContainer = $('<div>');
    hourContainer.addClass('hour col-2');
    hourContainer.text(displayHour + amPm);
    row.append(hourContainer);

    var writingArea = $('<textarea>');
    writingArea.addClass('col-8');
    row.append(writingArea);

    var btn = $('<div>');
    btn.append('<i class="fas fa-save saveBtn"></i>');
    btn.addClass('saveBtn col-2');
    row.append(btn);
}



[9, 10, 11, 12, 13, 14, 15, 16, 17].forEach(hour => createRow(hour));


// Color Code My Textareas
$('.row').each(function () {
    var divHour = $(this).data('hour');
    var currentHour = currentTime.hour;

    if(currentHour > divHour) {
        $(this).children('textarea').addClass('past');
    } else if (currentHour < divHour) {
        $(this).children('textarea').addClass('future');
    } else {
        $(this).children('textarea').addClass('present')
    }
})