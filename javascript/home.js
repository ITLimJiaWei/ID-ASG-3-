let APIKEY = "60213a203f9eb665a16892a7";
const splash = document.querySelector('.splash')

$(document).ready(function () {
let avatar_img_url = sessionStorage.getItem("avatar_img_url");
let avatar = sessionStorage.getItem("avatar");
let coins = parseInt(sessionStorage.getItem("coins"));

let username = sessionStorage.getItem("username");

let level = parseInt(sessionStorage.getItem("level"));

let health = parseInt(sessionStorage.getItem("health"));
let maxhealth = parseInt(sessionStorage.getItem("maxhealth"));
let healthbar = health/maxhealth*100;

let experience = parseInt(sessionStorage.getItem("experience"));
let maxexperience = parseInt(sessionStorage.getItem("maxexperience"));
let experiencebar = experience/maxexperience*100;

let lastevolve = parseInt(sessionStorage.getItem("lastevolve"));

function updatePage(){
    healthbar = health/maxhealth*100;
    experiencebar = experience/maxexperience*100;
    $("#home-starter-pic").attr("src",avatar_img_url);
    $("#nugget-count").text(coins);
    $("#home-username").text(username);
    $("#home-level").text("Level "+level);
    $("#hp-number").text(health+"/"+maxhealth);
    $(".bg-danger").width(healthbar+"%");
    $("#xp-number").text(experience+"/"+maxexperience);
    $(".bg-warning").width(experiencebar+"%");
}

updatePage();

let dailies =  JSON.parse(sessionStorage.getItem("dailies"));
let todos =  JSON.parse(sessionStorage.getItem("todo"));
let shop = JSON.parse(sessionStorage.getItem("shop"));


function beforeToday(taskDate){
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    taskDate.setHours(0,0,0,0);
    if(taskDate<currentDate){
        return 1;
    }else if(taskDate.getTime()==currentDate.getTime()){
        return 0;           
    }else{
        return -1;
    }
}
let overdue = [];
function updateStats(){
    if (health<0){
        $(".modal-body").text("You have died!");
        $('#homeModal').modal({ show: true});
        health=0;
    }
    if (experience>=maxexperience){
        $(".modal-body").text("You have leveled up!");
        $('#homeModal').modal({ show: true});
        maxhealth+=5;
        health=maxhealth;
        level+=1;
        let leftover = experience-maxexperience;
        experience=leftover;
        maxexperience+=5;
    }
    if(level==10 || level==20){
        if(lastevolve!=level){
            lastevolve=level;
            evolve();
        }           
    }
    let id = sessionStorage.getItem("id");
    let jsondata = {
        "health":health,
        "maxhealth":maxhealth,
        "experience":experience,
        "maxexperience":maxexperience,
        "level":level,
        "coins":coins,
        "avatar":avatar,
        "avatar_img_url":avatar_img_url,
        "lastevolve":lastevolve
    };
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/"+id,
        "method": "PATCH", 
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }
    $.ajax(settings).done(function (response) {           
        sessionStorage.setItem("avatar",response.avatar);
        sessionStorage.setItem("avatar_img_url",response.avatar_img_url);
        sessionStorage.setItem("health",response.health);
        sessionStorage.setItem("experience",response.experience);
        sessionStorage.setItem("level",response.level);
        sessionStorage.setItem("coins",response.coins);
        sessionStorage.setItem("maxhealth",response.maxhealth);
        sessionStorage.setItem("maxexperience",response.maxexperience);  
        sessionStorage.setItem("lastevolve",response.lastevolve);     
    });                       
    updatePage();
}

function updateDailies(){
    $("#home-daily-column>div").remove();
    for (var daily in dailies) {
        let currentDate = new Date();
        let utcDate = dailies[daily];    //convert utc date to local date due to JSON.stringify auto conversion
        let localDate = new Date(utcDate);
        dailies[daily] = localDate;
        let check =  beforeToday(localDate);
        if (check==1){  //task expired, penalty
            overdue.push(daily);
            health -=5; //penalty
            updateStats();
            dailies[daily] = currentDate; //update date
            $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+daily+'">Delete</button></div></div></div></div>');
        }else if (check ==0){ //due today
            $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+daily+'">Delete</button></div></div></div></div>');

        }else{  //due in future
            //do nothing
        }
    }
    sessionStorage.setItem("dailies",JSON.stringify(dailies));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "dailies":JSON.stringify(dailies)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/"+id,
            "method": "PATCH", 
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
                },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
        $.ajax(settings).done(function () {});
}
function updateTodo(){
    $("#home-todo-column>div").remove();
    for (var todo in todos) {
        let utcDate = todos[todo][0];
        let localDate = new Date(utcDate); //convert utc date to local date due to JSON.stringify auto conversion
        todos[todo][0] = localDate;
        if (todos[todo][1]==0){
            let check =  beforeToday(localDate);
            if (check==1){  //task expired, penalty
                overdue.push(todo);
                health -=5; //some penalty
                updateStats();
                todos[todo][1]=1;
            }else if (check ==0){ //due today
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+todo+'">Delete</button></div></div></div></div>');
                //$("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>');      
            }else{  //due in future
                //$("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>'); 
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+todo+'">Delete</button></div></div></div></div>');     
            }
        }      
    }
    sessionStorage.setItem("todo",JSON.stringify(todos));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "todo":JSON.stringify(todos)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/"+id,
            "method": "PATCH", 
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
                },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
        $.ajax(settings).done(function () {});
}
function updateShop(){
    $("#home-shop-column>div").remove();
    for (var item in shop) {
        let cost = shop[item];
        $("#home-shop-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+item+'"></div><div class="flex-item2">'+item+'</div><div class="flex-item3"><div class="flex-container-shop"><div id="nugget-count">'+cost+'</div><img src="pictures/nugget.png" alt="PokePlanner Currency Icon"> </div></div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+item+'">Delete</button></div></div></div></div>');       
    }
    sessionStorage.setItem("shop",JSON.stringify(shop));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "shop":JSON.stringify(shop)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/"+id,
            "method": "PATCH", 
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
                },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
        $.ajax(settings).done(function () {});
}

updateDailies();    
updateTodo();
updateShop();
if(overdue.length!=0){
    console.log(overdue);
    let overduestring = "";
    for(let i = 0 ;i<overdue.length;i++){
        overduestring+=overdue[i]+", ";
    }
    overduestring2 = overduestring.slice(0,-2);
    $(".modal-body").text("You didn't do: " + overduestring2);
    $('#homeModal').modal({ show: true});
}

$("#home-daily-add").keypress(function(event) { 
    if (event.keyCode === 13) { 
        let daily = $("#home-daily-add").val();
        let currentDate = new Date();
        dailies[daily] = currentDate;
        updateDailies();
        $("#home-daily-add").val('');
        //$(':focus').blur()            
    } 
}); 


$("#home-todo-add").keypress(function(event) { 
    if (event.keyCode === 13) { 
       let value = $("#home-todo-add").val();
       let todo = value.split(",");
       let dueDate = Date.parse(todo[1]);
       if (isNaN(dueDate)){
            let maxDate = new Date("9999-12-31T23:59:59");
            todos[todo[0]] = [maxDate,0];
       }else{

            todos[todo[0]] = [dueDate,0];
       }        
       var height = $("#home-todo-column").height();
       console.log(height);
       height = height + 10;
       console.log(height);
       $("#home-todo-column").css({"height": height+"px"}); 
       updateTodo();
       $("#home-todo-add").val('');
       //$(':focus').blur()          
    } 
}); 

$("#home-shop-add").keypress(function(event) { 
    if (event.keyCode === 13) { 
       let value = $("#home-shop-add").val();
       let reward = value.split(",");
       let item = reward[0];
       let cost = reward[1];
       if(isNaN(cost)){
        shop[item] = 0;
       }else{
        shop[item] = cost;
       }         
       updateShop();
       $("#home-shop-add").val('');
       $(':focus').blur()          
    } 
}); 

$(".home-middle-container").on("click",function(e) {       //check box listener and delete button listener
    let parentid = $(e.target).parent().parent().parent().attr("id");    
    let item = $(e.target).data("item");  
    if(e.target.checked) {     
        if(parentid =="home-daily-column"){   
            let tmrwDate  = new Date();
            tmrwDate.setDate(tmrwDate.getDate()+1);   
            dailies[item] = tmrwDate;
            $(e.target).parent().parent().remove();
            experience+=10;
            coins+=10;
            updateStats();
            updateDailies();    
        }
        else if (parentid =="home-todo-column"){
            todos[item][1]=1;
            experience+=20;
            coins+=20;
            updateStats();
            updateTodo();
        }else if (parentid =="home-shop-column"){
            let cost = shop[item];
            if (coins>=cost){
                coins-=shop[item];
                delete shop[item];
                updateStats();
                updateShop();
            }else{
                $(".modal-body").text("Insufficient nuggets!");
                $('#homeModal').modal({ show: true});  
                $(e.target).prop( "checked", false );
            }       
        }else{
            console.log("error");
        }
    }else if ($(e.target).hasClass("delete-button")){
        parentid= $(e.target).parent().parent().parent().parent().parent().attr("id"); 
        if(parentid =="home-daily-column"){      
            delete dailies[item];
            updateDailies();
        }
        else if (parentid =="home-todo-column"){
            delete todos[item];
            updateTodo();
        }else if (parentid =="home-shop-column"){
            delete shop[item];
            updateShop();
        }else{
            console.log("error");
        }
    }
});

function evolve(){                          //evolve was originally 1 function but had to be split up due to async issues
    jQuery.ajaxSetup({async:false});
    let url = "https://pokeapi.co/api/v2/pokemon/"+avatar;
    var settings = {
      "url": url,
      "method": "GET",
      "timeout": 0,
      
    };
    
    $.ajax(settings).done(function (response) {
        let url = response.species.url;
        console.log("evolve");
        evolve2(url);       
    });
}
function evolve2(url){
    let settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        
    };
    $.ajax(settings).done(function (response) {
        console.log("evolve2");
        evolve3(response.evolution_chain.url);         
    });
}
function evolve3(url){
    let settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,

    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.chain.evolves_to[0].species.name != avatar){
            avatar = response.chain.evolves_to[0].species.name;                   
        }else if (avatar != response.chain.evolves_to[0].evolves_to[0].species.name){
            avatar = response.chain.evolves_to[0].evolves_to[0].species.name;
        }
        let url = "https://pokeapi.co/api/v2/pokemon/"+avatar;
        console.log("evolve3");
        evolve4(url);
    });
}
function evolve4(url){
    var settings= {
        "url": url,
        "method": "GET",
        "timeout": 0,
        
        };
        
        $.ajax(settings).done(function (response) {
        let sprite = response.sprites.front_default;
        $("#home-starter-pic").attr("src",sprite);
        avatar_img_url=sprite;
        });
        updateStats();
}

//dev tools
//sessionStorage.setItem("level",9);
//sessionStorage.setItem("level",19);

});