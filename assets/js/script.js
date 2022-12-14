var currentDay = moment().format("dddd, MMMM Do");

var output = $(".container");

// For the event listener on the buttons I take advantage
// of the event delegation (bubbling).
// Place the event listener for click on the container of
// all hour slots.
// Using custom data to distinguish which button was pressed
// so we save the text to the appropriate object property
// We can reuse "output" for that purpose, commenting out allRows
// var allRows = $('.container');

// We need to know present hour to colour the background
// of hour slots for the past, present an future ones.
// Must ensure the presentHour is treated as a number, hence
// using the Number() function. Without it the code is buggy 
// as it treats these as strings/characters.
// var presentHour = Number(15);  // <-- hard set value for debugging purposes

var presentHour = Number(moment().format("HH"));
console.log("presentHour is: " + presentHour);

// console.log('Current Day is: ' + currentDay);
// console.log('Present hour; ' + presentHour);

var currentDayEl = $('#currentDay');

console.log(currentDayEl);

currentDayEl.text(currentDay);

// Each time block is a flex box with flex-direction row:
// - row (using the .row class)
// - with hour displayed on the left (using the .hour class)
// - text area in the centre
// blue button on the right to save the text to local storage
// Use .past, .present and .future styling classes
// to style those blocks relative to the current time

// We have only a static display for one (present) day
// for a fixed number of time slots between 9:00 and 17:00 hour
// Taking a lazy approach and hard coding the time slots in an 
// object of key-value pairs, one pair for each hour slot,
// key being the hour, value the text of to-dos

var timeSlots = {
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: ''
}


function getHourSlots() {
    // This returns either items in the array or an empty object 
    // if there are no items in the object yet
    return JSON.parse(localStorage.getItem('dayPlans')) || {};
}

function saveHourSlots(obj) {
    localStorage.setItem('dayPlans', JSON.stringify(timeSlots));
}


function displayHourSlots() {

    // clear the area before displaying data
    output.html('');
    var timeClass ='past';

    // Each time block is a flex box with flex-direction row:
    // - row (using the .row class)
    // - with hour displayed on the left (using the .hour class)
    // - text area in the centre
    // blue button on the right to save the text to local storage
    // Use .past, .present and .future styling classes
    // to style those blocks relative to the current time

    // We have only a static display for one (present) day
    // for a fixed number of time slots between 9:00 and 17:00 hour
    // Taking a lazy approach and hard coding the time slots in an 
    // object of key-value pairs, one pair for each hour slot,
    // key being the hour, value the text of to-dos

    // Need to define this second time inside this function
    // without it timeSlots can be undefined from different
    // code paths entering this function
    
    var timeSlots = {
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: ''
}
    // First display an empty day plan, then load the data
    // from local storage and update corresponding slots.
    // Loop over the hour slots and assign corresponding 
    // class to style each slot depending on it being
    // in the past, present of future relative to current time

    $.each(timeSlots, function(key, value){
        var hour = Number(key);

        if (presentHour > hour) {
            timeClass = 'past';
        } else if (presentHour === hour) {
            timeClass = 'present';
        } else // if (presentHour < hour) 
        {  
            timeClass = 'future';
        }

        // console.log("timeClass is: " + timeClass);

        // Use custom data textIndex and hourIndex
        // to identify which button in which
        // row was pressed. This is important for later to store
        // the new data in the right property inside the 
        // timeSlots object

        output.append(`
            <div class="row">
                <div class="hour">${hour}</div>
                <textarea id="textarea" data-textIndex="${hour}" rows="3" cols="80" class=${timeClass}>${value}</textarea>
                <button class="saveBtn" data-hourIndex="${hour}"><i class="fas fa-save"></i>
                </button>
            </div>
        `);
     })


    // load hour slots from localStorage
    var timeSlots = getHourSlots();

    // Now copy what was loaded from local storage
    // to the corresponding text areas of each time
    // slot on the web page
    
    if (timeSlots) {
        // console.log("timeSlots are not empty");

        $.each(timeSlots, function(key, value){
            var hour = Number(key);
            
            // console.log($(this));
            // console.log($(this).val(value));

            // Select the corresponding text area in the output
            // based on the custom data 'textIndex'
            $(`[data-textIndex = "${hour}"]`).val(value);
        });
    } else {
        // console.log("timeSlots are empty");
    }
}

// Event listener for buttons.
// Relying on event bubbling up to the 'output' container
// and identifying which button was pressed 
output.on('click', 'button', function(){

    var btn = $(this);
    var buttonIndex = btn.data('hourIndex');

    // console.log('clicked');

    toDos = $(this).siblings('#textarea').val();
    hour = $(this).siblings('.hour').text(); 
    timeSlots[hour] = toDos; 

    //Save the hour slots to localStorage
    saveHourSlots(timeSlots);
 })

displayHourSlots(); 