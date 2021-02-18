const monthNames = ["January", "February", "March", "April", "May", "June",   //from stackoverflow
  "July", "August", "September", "October", "November", "December"
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  //from stackoverflow

let colors = ["--color:#db7f7a", "--color:#db847a", "--color:#db8d7a", "--color:#db8d7a", "--color:#db917a", "--color:#db967a", "--color:#db9a7a", "--color:#db9a7a", "--color:#db9f7a", "--color:#dba37a",
  "--color:#dba87a", "--color:#dbac7a", "--color:#dbb07a", "--color:#dbb57a", "--color:#dbbe7a", "--color:#dbc27a", "--color:#dbc77a", "--color:#dbd07a", "--color:#dbd47a", "--color:#dbd97a", "--color:#d9db7a",
  "--color:#d0db7a", "--color:#cbdb7a", "--color:#c7db7a", "--color:#c2db7a", "--color:#bedb7a", "--color:#b9db7a", "--color:#b5db7a", "--color:#acdb7a", "--color:#acdb7a", "--color:#acdb7a"]; //compiled from calendar template

let colPos = [4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6]; //grid column positioning for dates

function daysInMonth(month, year) {  //from stackoverflow
  return new Date(year, month, 0).getDate();
}

Date.prototype.addDays = function (days) { //from stackoverflow
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
let todos = JSON.parse(sessionStorage.getItem("todo"));  //parse in event dates to be appended into calendar, dailies are not considered events

function updateCalendar(currentDate) { //refresh calendar
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let noOfDays = daysInMonth((month + 1), year);
  let monthName = monthNames[month];
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  $(".month--name").text(monthName);  //Update calendar month name
  $('.date').remove();  //clear previous calendar
  $('.event').remove(); //clear previous events
  var dayName = days[firstDay.getDay()];
  for (i = 0; i < noOfDays; i++) {  //make calendar
    dayName = days[firstDay.getDay()];
    let x = $(".main-content").append('<div class="date ' + dayName + '" style="' + colors[i] + '">' + (i + 1) + '</div>');
    firstDay = firstDay.addDays(1);
  }
  for (var todo in todos) { //make events and grid position them
    let utcDate = todos[todo][0];
    let localDate = new Date(utcDate); //convert utc date to local date due to JSON.stringify auto conversion
    let style;
    todos[todo][0] = localDate;
    let currentDay = localDate.getDate();
    let dateDiv = "div.date:nth-child(" + (currentDay + 1) + ")"; //also need to grid position the dates of those events
    if (localDate.getFullYear() == currentDate.getFullYear()) {
      if (localDate.getMonth() == month) {
        if (currentDay >= 1 && currentDay <= 4) {
          style = "grid-row:1";
          $(dateDiv).css("grid-row", "1");
        } else if (currentDay >= 5 && currentDay <= 11) {
          style = "grid-row:2";
          $(dateDiv).css("grid-row", "2");
        }
        else if (currentDay >= 12 && currentDay <= 18) {
          style = "grid-row:3";
          $(dateDiv).css("grid-row", "3");
          $(dateDiv).css("grid-row", "3");
        }
        else if (currentDay >= 19 && currentDay <= 25) {
          style = "grid-row:4";
          $(dateDiv).css("grid-row", "4");
        } else if (currentDay >= 26 && currentDay <= 31) {
          style = "grid-row:5";
          $(dateDiv).css("grid-row", "5");
        }
        style += ";grid-column:" + colPos[currentDay - 1];
        $(dateDiv).css("grid-column", colPos[currentDay - 1]);
        $(".main-content").append('<div class="event" style="' + style + '"><div class="event__name">' + todo + '</div> </div>');
      }
    }
  }
}


$(document).ready(function () {

  let coins = parseInt(sessionStorage.getItem("coins"));
  $("#nugget-count").text(coins); //update coins on top
  let currentDate = new Date();
  $("#calendar-heading").text("PokéCalendar " + currentDate.getFullYear()); //only shows calendar for current year
  updateCalendar(currentDate);

  $("#next").on("click", function (e) {  //next month
    e.preventDefault();
    let month = currentDate.getMonth() + 1;
    currentDate.setMonth(month);
    updateCalendar(currentDate);
  })
  $("#prev").on("click", function (e) {  //prev month
    e.preventDefault();
    let month = currentDate.getMonth() - 1;
    currentDate.setMonth(month);
    updateCalendar(currentDate);
  })
});


