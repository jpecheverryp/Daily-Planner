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

// Assigns every number that will be used on the date
var weekday = getWeekDay(currentTime.weekday)
var month = getMonth(currentTime.month);
var day = currentTime.day;
var suffix = getSuffix(currentTime.day);

// Displays current date on the screen
$('#currentDay').text(`${weekday}, ${month} ${day}${suffix}`);

//------------- Time Blocks Generator -----------

function createRow(hour) {
    // Text that will be displayed on the screen
    var displayHour = hour;

    // Creates the row 
    var row = $('<div>');
    row.addClass('row');
    // Assigns the data-hour attribute to the row using the current hour
    row.attr('data-hour', hour)
    $('.container').append(row);

    // Checks if the current hour is before or after 12 and assigns Am or PM to it
    if (hour < 12) {
        var amPm = ' AM';
    } else {
        var amPm = ' PM';
    }

    // Changes display hour to 12 hour format
    if (hour > 13) {
        displayHour = hour - 12;
    }

    // Creates the Hour container
    var hourContainer = $('<div>');
    hourContainer.addClass('hour col-2');
    hourContainer.text(displayHour + amPm);
    row.append(hourContainer);

    // Creates the writing area 
    var writingArea = $('<textarea>');
    writingArea.addClass('col-8');
    row.append(writingArea);

    // creates the button
    var btn = $('<div>');
    btn.append('<i class="fas fa-save saveBtn"></i>');
    btn.addClass('saveBtn col-2');
    row.append(btn);

    // Event listener to save to local Storage
    btn.on('click', function () {
        // Selects the whole row where the button is located
        var parentRow = $(this).parent();
        // Selects hour from data-attribute
        var hourClicked = 'hour-' + parentRow.data('hour');
        // Selects the text inside of the textarea
        var task = parentRow.children('textarea').val();
        // Sets the item on local storage with the hour and the task included
        localStorage.setItem(hourClicked, task);
    })

}

// Creates rows using arrays with hours (24-hour format)
[9, 10, 11, 12, 13, 14, 15, 16, 17,18, 19, 20 , 21, 22, 23].forEach(hour => createRow(hour));


// Color Code My Textareas
$('.row').each(function () {
    var divHour = $(this).data('hour');
    var currentHour = currentTime.hour;

    if (currentHour > divHour) {
        $(this).children('textarea').addClass('past');
    } else if (currentHour < divHour) {
        $(this).children('textarea').addClass('future');
    } else {
        $(this).children('textarea').addClass('present')
    }
})

// Retrieve Tasks from local Storage
// Do the same to each row
$('.row').each(function () {
    // Get the hour of the row using data-hour attribute
    var divHour = 'hour-' + $(this).data('hour');
    // get the text of the task from the local storage
    var taskInfo = localStorage.getItem(divHour);
    // If the task does not exist it will return null (we check if it does exist)
    if (taskInfo !== null) {
        // We set the value 
        $(this).children('textarea').val(taskInfo);
        console.log(localStorage.getItem(divHour));
    }
})