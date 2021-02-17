const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let colors = ["--color:#db7f7a","--color:#db847a","--color:#db8d7a","--color:#db8d7a","--color:#db917a","--color:#db967a","--color:#db9a7a","--color:#db9a7a","--color:#db9f7a","--color:#dba37a",
"--color:#dba87a","--color:#dbac7a","--color:#dbb07a","--color:#dbb57a","--color:#dbbe7a","--color:#dbc27a","--color:#dbc77a","--color:#dbd07a","--color:#dbd47a","--color:#dbd97a","--color:#d9db7a",
"--color:#d0db7a","--color:#cbdb7a","--color:#c7db7a","--color:#c2db7a","--color:#bedb7a","--color:#b9db7a","--color:#b5db7a","--color:#acdb7a","--color:#acdb7a","--color:#acdb7a"];

let colPos=[4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6];

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
let todos =  JSON.parse(sessionStorage.getItem("todo"));

function updateCalendar(currentDate){
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let noOfDays = daysInMonth((month+1),year);
  let monthName = monthNames[month];
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  $(".month--name").text(monthName);
  $('.date').remove();
  $('.event').remove();
  var dayName = days[firstDay.getDay()];
  for(i = 0; i < noOfDays; i++){
    dayName= days[firstDay.getDay()];
    let x = $(".main-content").append('<div class="date '+dayName+'" style="'+colors[i]+'">'+(i+1)+'</div>');
    firstDay = firstDay.addDays(1);
  }
  for (var todo in todos) {
        let utcDate = todos[todo][0];
        let localDate = new Date(utcDate); //convert utc date to local date due to JSON.stringify auto conversion
        let style;
        todos[todo][0] = localDate;   
        let currentDay=localDate.getDate();
        let dateDiv = "div.date:nth-child("+(currentDay+1)+")";
        if(localDate.getMonth()==month){
          if (currentDay>=1&&currentDay<=4){
            style="grid-row:1";
          }else if (currentDay>=5&&currentDay<=11){
            style="grid-row:2";
          }
          else if (currentDay>=12&&currentDay<=18){
            style="grid-row:3";
            $(dateDiv).css("grid-row","3");
          }
          else if (currentDay>=19&&currentDay<=25){
            style="grid-row:4";
          }else if (currentDay>=26&&currentDay<=31){
            style="grid-row:5";
          }
          style+=";grid-column:"+colPos[currentDay-1];
          $(dateDiv).css("grid-column",colPos[currentDay-1]);
          $(".main-content").append('<div class="event" style="'+style+'"><div class="event__name">'+todo+'</div> </div>');
        }
        
    }
}


$(document).ready(function () {
  
  let coins = parseInt(sessionStorage.getItem("coins"));
  $("#nugget-count").text(coins);
  let currentDate = new Date();
  $("#calendar-heading").text("PokéCalendar "+currentDate.getFullYear());
  updateCalendar(currentDate);
  
  $("#next").on("click",function(e){
    e.preventDefault();
    let month = currentDate.getMonth()+1; 
    currentDate.setMonth(month);
    updateCalendar(currentDate);
  })
  $("#prev").on("click",function(e){
    e.preventDefault();
    let month = currentDate.getMonth()-1; 
    currentDate.setMonth(month);
    updateCalendar(currentDate);
  })
});


