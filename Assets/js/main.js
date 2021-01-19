// Import the luxon Datetime object as Datetime 
var DateTime = luxon.DateTime;
console.log(DateTime.local());

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

function getSuffix(dayNumber) {
    var lastNumber = dayNumber % 10;
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

var weekday = getWeekDay(DateTime.local().weekday)
var month = getMonth(DateTime.local().month);
var day = DateTime.local().day;
var suffix = getSuffix(DateTime.local().day);

$('#currentDay').text(`${weekday}, ${month} ${day}${suffix}`);