var currentDay = moment().format("dddd, MMMM Do");

console.log('Current Day is: ' + currentDay);

var currentDayEl = $('#currentDay');

console.log(currentDayEl);

currentDayEl.text(currentDay);