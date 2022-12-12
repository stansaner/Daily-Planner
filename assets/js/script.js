var currentDay = moment().format("dddd, MMMM Do");

// We need to know present hour to colour the background
// of hour slots for the past, present an future ones.
var presentHour = moment().format("H");

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

var timeslots ={
    09: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: ''
}
