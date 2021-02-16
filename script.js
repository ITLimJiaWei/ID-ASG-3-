const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none');
  }, 2000);
})






let APIKEY = "60213a203f9eb665a16892a7";
let currentUser;

$(document).ready(function () {
    $("#signup-username").on("focusout",function(){
        let username =  $("#signup-username").val();
        let query = '"username":"'+username+'"';
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner?q={"+query+"}",
            "method": "GET", 
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function (response) {
            //console.log("Checking for user");
            //console.log(response);
            if(jQuery.isEmptyObject(response)){
                //console.log("No exisitng user found, proceed");
                $("#signup-btn"). attr("disabled", false);
            }else{
                //console.log("Exisitng user found")
                alert("Existing user found!")
                $("#signup-form").trigger("reset");
                $("#signup-btn"). attr("disabled", true);
            }
        });
    });


    $("#signup-btn").on("click", function (e) {
        e.preventDefault();

        //you are to do your own data validation
        let signupUsername = $("#signup-username").val();
        let signupPassword = $("#signup-password").val();
        let signupConfirmPassword = $("#signup-confirmpassword").val();
        let validInput = false;
        if(signupUsername){
            if(signupPassword!=""){
                if(signupPassword==signupConfirmPassword){
                    validInput=true;
                }
            }      
        }

        if (validInput){
            let currentDate = new Date();
            let ystdDate = new Date();
            ystdDate.setDate(ystdDate.getDate()-1);
            let tmrwDate  = new Date();
            tmrwDate.setDate(tmrwDate.getDate()+1);
            let jsondata = {
                "username": signupUsername,
                "password":signupPassword,
                "level":1,
                "experience":0,
                "health":50,
                "coins":0,
                "dailies":'{"Daily Ystd":"'+ystdDate+'","Daily Tdy":"'+currentDate+'","Daily Tmrw":"'+tmrwDate+'"}',
                "todo":'{"Todo Ystd":"'+ystdDate+'","Todo Tdy":"'+currentDate+'","Todo Tmrw":"'+tmrwDate+'"}',
                "shop":'{"test":2}',
                "maxhealth":50,
                "maxexperience":50,
                "lastevolve":0
            };
            let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner",
            "method": "POST", 
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
                },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function(){          
                $("#signup-form").trigger("reset");
                }
            }
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                //console.log("Creating new user");            
                sessionStorage.setItem("username",signupUsername)
                sessionStorage.setItem("password",signupPassword)  
                sessionStorage.setItem("id",response._id)
                sessionStorage.setItem("avatar",response.avatar);
                sessionStorage.setItem("avatar_img_url",response.avatar_img_url);
                sessionStorage.setItem("health",response.health);
                sessionStorage.setItem("experience",response.experience);
                sessionStorage.setItem("level",response.level);
                sessionStorage.setItem("coins",response.coins);
                sessionStorage.setItem("shop",response.shop);
                sessionStorage.setItem("todo",response.todo);
                sessionStorage.setItem("dailies",response.dailies);
                sessionStorage.setItem("maxhealth",response.maxhealth);
                sessionStorage.setItem("maxexperience",response.maxexperience);
                sessionStorage.setItem("lastevolve",response.lastevolve);
                window.location.href = "selection.html";       
            });                       
        }else{
            alert("Wrong input!");
        }
    });

    
    //Login Page

    $("#login-username").on("focusout",function(){
        let username =  $("#login-username").val();
        let query = '"username":"'+username+'"';
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner?q={"+query+"}",
            "method": "GET", 
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function (response) {
            console.log("Checking for user");
            console.log(response);
            if(jQuery.isEmptyObject(response)){
                alert("No exisitng user found");
                $("#login-form").trigger("reset");
                $("#login-btn"). attr("disabled", true);
            }else{
                console.log("User Exists")
                $("#login-btn"). attr("disabled", false);
            }
        });
    });

    $("#login-btn").on("click", function (e) {
        e.preventDefault();

        //you are to do your own data validation
        let loginUsername = $("#login-username").val();
        let loginPassword = $("#login-password").val();
        let validInput = false;
        if(loginUsername){
            if(loginPassword){
                validInput=true;
            }      
        }

        if (validInput){     
            let query = '"username":"'+loginUsername+'","password":"'+loginPassword+'"';
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner?q={"+query+"}",
                "method": "GET", 
                "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                console.log(response);
                sessionStorage.setItem("username",loginUsername);
                sessionStorage.setItem("password",loginPassword);
                sessionStorage.setItem("id",response[0]._id);
                sessionStorage.setItem("avatar",response[0].avatar);
                sessionStorage.setItem("avatar_img_url",response[0].avatar_img_url);
                sessionStorage.setItem("health",response[0].health);
                sessionStorage.setItem("experience",response[0].experience);
                sessionStorage.setItem("level",response[0].level);
                sessionStorage.setItem("coins",response[0].coins);
                sessionStorage.setItem("shop",response[0].shop);
                sessionStorage.setItem("todo",response[0].todo);
                sessionStorage.setItem("dailies",response[0].dailies);
                sessionStorage.setItem("maxhealth",response[0].maxhealth);
                sessionStorage.setItem("maxexperience",response[0].maxexperience);
                sessionStorage.setItem("lastevolve",response[0].lastevolve);
                window.location.href = "home.html";       
            });
        }else{
            alert("Wrong input!");
        }
    });
    
    //Home Page
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
    
    function updateStats(){
        if (health<0){
            alert("You have died!");
            health=0;
        }
        if (experience>=maxexperience){
            alert("You have leveled up!");
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
                alert("You didn't do " + daily);    //some penalty
                health -=5;
                updateStats();
                dailies[daily] = currentDate; //update date
                //$("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+daily+'">Delete</button></div></div>');
                $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+daily+'">Delete</button></div></div></div></div>');
            }else if (check ==0){ //due today
                //$("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+daily+'">Delete</button></div></div>');
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
            let utcDate = todos[todo];
            let localDate = new Date(utcDate); //convert utc date to local date due to JSON.stringify auto conversion
            todos[todo] = localDate;
            let check =  beforeToday(localDate);
            if (check==1){  //task expired, penalty
                alert("You didn't do " + todo);    //some penalty
                health -=5;
                updateStats();
                delete todos[todo];
            }else if (check ==0){ //due today
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+todo+'">Delete</button></div></div></div></div>');
                //$("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>');      
            }else{  //due in future
                //$("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>'); 
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+todo+'">Delete</button></div></div></div></div>');     
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
            $("#home-shop-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+item+'"></div><div class="flex-item2">'+item+'</div><div class="flex-item3"><div class="flex-container"><div id="nugget-count">'+cost+'</div><img src="pictures/nugget.png" alt="PokePlanner Currency Icon"> </div></div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="'+item+'">Delete</button></div></div></div></div>');       
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

    updateDailies();    //runs even in signup page, nid to fix
    updateTodo();
    updateShop();
    
    $("#home-daily-add").keypress(function(event) { 
        if (event.keyCode === 13) { 
            let daily = $("#home-daily-add").val();
            let currentDate = new Date();
            dailies[daily] = currentDate;
            updateDailies();
            $("#home-daily-add").val('');
            $(':focus').blur()            
        } 
    }); 

    
    $("#home-todo-add").keypress(function(event) { 
        if (event.keyCode === 13) { 
           let value = $("#home-todo-add").val();
           let todo = value.split(",");
           let dueDate = Date.parse(todo[1]);
           if (isNaN(dueDate)){
                let maxDate = new Date("9999-12-31T23:59:59");
                todos[todo[0]] = maxDate;
           }else{

                todos[todo[0]] = dueDate;
           }          
           updateTodo();
           $("#home-todo-add").val('');
           $(':focus').blur()          
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
                delete todos[item];
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
                    alert("Insufficient nuggets!"); 
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

// CALENDAR TEMPLATE

!function() {

    var today = moment();
  
    function Calendar(selector, events) {
      this.el = document.querySelector(selector);
      this.events = events;
      this.current = moment().date(1);
      this.draw();
      var current = document.querySelector('.today');
      if(current) {
        var self = this;
        window.setTimeout(function() {
          self.openDay(current);
        }, 500);
      }
    }
  
    Calendar.prototype.draw = function() {
      //Create Header
      this.drawHeader();
  
      //Draw Month
      this.drawMonth();
  
      this.drawLegend();
    }
  
    Calendar.prototype.drawHeader = function() {
      var self = this;
      if(!this.header) {
        //Create the header elements
        this.header = createElement('div', 'header');
        this.header.className = 'header';
  
        this.title = createElement('h1');
  
        var right = createElement('div', 'right');
        right.addEventListener('click', function() { self.nextMonth(); });
  
        var left = createElement('div', 'left');
        left.addEventListener('click', function() { self.prevMonth(); });
  
        //Append the Elements
        this.header.appendChild(this.title); 
        this.header.appendChild(right);
        this.header.appendChild(left);
        this.el.appendChild(this.header);
      }
  
      this.title.innerHTML = this.current.format('MMMM YYYY');
    }
  
    Calendar.prototype.drawMonth = function() {
      var self = this;
      
      this.events.forEach(function(ev) {
       ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
      });
      
      
      if(this.month) {
        this.oldMonth = this.month;
        this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
        this.oldMonth.addEventListener('webkitAnimationEnd', function() {
          self.oldMonth.parentNode.removeChild(self.oldMonth);
          self.month = createElement('div', 'month');
          self.backFill();
          self.currentMonth();
          self.fowardFill();
          self.el.appendChild(self.month);
          window.setTimeout(function() {
            self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
          }, 16);
        });
      } else {
          this.month = createElement('div', 'month');
          this.el.appendChild(this.month);
          this.backFill();
          this.currentMonth();
          this.fowardFill();
          this.month.className = 'month new';
      }
    }
  
    Calendar.prototype.backFill = function() {
      var clone = this.current.clone();
      var dayOfWeek = clone.day();
  
      if(!dayOfWeek) { return; }
  
      clone.subtract('days', dayOfWeek+1);
  
      for(var i = dayOfWeek; i > 0 ; i--) {
        this.drawDay(clone.add('days', 1));
      }
    }
  
    Calendar.prototype.fowardFill = function() {
      var clone = this.current.clone().add('months', 1).subtract('days', 1);
      var dayOfWeek = clone.day();
  
      if(dayOfWeek === 6) { return; }
  
      for(var i = dayOfWeek; i < 6 ; i++) {
        this.drawDay(clone.add('days', 1));
      }
    }
  
    Calendar.prototype.currentMonth = function() {
      var clone = this.current.clone();
  
      while(clone.month() === this.current.month()) {
        this.drawDay(clone);
        clone.add('days', 1);
      }
    }
  
    Calendar.prototype.getWeek = function(day) {
      if(!this.week || day.day() === 0) {
        this.week = createElement('div', 'week');
        this.month.appendChild(this.week);
      }
    }
  
    Calendar.prototype.drawDay = function(day) {
      var self = this;
      this.getWeek(day);
  
      //Outer Day
      var outer = createElement('div', this.getDayClass(day));
      outer.addEventListener('click', function() {
        self.openDay(this);
      });
  
      //Day Name
      var name = createElement('div', 'day-name', day.format('ddd'));
  
      //Day Number
      var number = createElement('div', 'day-number', day.format('DD'));
  
  
      //Events
      var events = createElement('div', 'day-events');
      this.drawEvents(day, events);
  
      outer.appendChild(name);
      outer.appendChild(number);
      outer.appendChild(events);
      this.week.appendChild(outer);
    }
  
    Calendar.prototype.drawEvents = function(day, element) {
      if(day.month() === this.current.month()) {
        var todaysEvents = this.events.reduce(function(memo, ev) {
          if(ev.date.isSame(day, 'day')) {
            memo.push(ev);
          }
          return memo;
        }, []);
  
        todaysEvents.forEach(function(ev) {
          var evSpan = createElement('span', ev.color);
          element.appendChild(evSpan);
        });
      }
    }
  
    Calendar.prototype.getDayClass = function(day) {
      classes = ['day'];
      if(day.month() !== this.current.month()) {
        classes.push('other');
      } else if (today.isSame(day, 'day')) {
        classes.push('today');
      }
      return classes.join(' ');
    }
  
    Calendar.prototype.openDay = function(el) {
      var details, arrow;
      var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
      var day = this.current.clone().date(dayNumber);
  
      var currentOpened = document.querySelector('.details');
  
      //Check to see if there is an open detais box on the current row
      if(currentOpened && currentOpened.parentNode === el.parentNode) {
        details = currentOpened;
        arrow = document.querySelector('.arrow');
      } else {
        //Close the open events on differnt week row
        //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
        if(currentOpened) {
          currentOpened.addEventListener('webkitAnimationEnd', function() {
            currentOpened.parentNode.removeChild(currentOpened);
          });
          currentOpened.addEventListener('oanimationend', function() {
            currentOpened.parentNode.removeChild(currentOpened);
          });
          currentOpened.addEventListener('msAnimationEnd', function() {
            currentOpened.parentNode.removeChild(currentOpened);
          });
          currentOpened.addEventListener('animationend', function() {
            currentOpened.parentNode.removeChild(currentOpened);
          });
          currentOpened.className = 'details out';
        }
  
        //Create the Details Container
        details = createElement('div', 'details in');
  
        //Create the arrow
        var arrow = createElement('div', 'arrow');
  
        //Create the event wrapper
  
        details.appendChild(arrow);
        el.parentNode.appendChild(details);
      }
  
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);
  
      this.renderEvents(todaysEvents, details);
  
      arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
    }
  
    Calendar.prototype.renderEvents = function(events, ele) {
      //Remove any events in the current details element
      var currentWrapper = ele.querySelector('.events');
      var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));
  
      events.forEach(function(ev) {
        var div = createElement('div', 'event');
        var square = createElement('div', 'event-category ' + ev.color);
        var span = createElement('span', '', ev.eventName);
  
        div.appendChild(square);
        div.appendChild(span);
        wrapper.appendChild(div);
      });
  
      if(!events.length) {
        var div = createElement('div', 'event empty');
        var span = createElement('span', '', 'No Events');
  
        div.appendChild(span);
        wrapper.appendChild(div);
      }
  
      if(currentWrapper) {
        currentWrapper.className = 'events out';
        currentWrapper.addEventListener('webkitAnimationEnd', function() {
          currentWrapper.parentNode.removeChild(currentWrapper);
          ele.appendChild(wrapper);
        });
        currentWrapper.addEventListener('oanimationend', function() {
          currentWrapper.parentNode.removeChild(currentWrapper);
          ele.appendChild(wrapper);
        });
        currentWrapper.addEventListener('msAnimationEnd', function() {
          currentWrapper.parentNode.removeChild(currentWrapper);
          ele.appendChild(wrapper);
        });
        currentWrapper.addEventListener('animationend', function() {
          currentWrapper.parentNode.removeChild(currentWrapper);
          ele.appendChild(wrapper);
        });
      } else {
        ele.appendChild(wrapper);
      }
    }
  
    Calendar.prototype.drawLegend = function() {
      var legend = createElement('div', 'legend');
      var calendars = this.events.map(function(e) {
        return e.calendar + '|' + e.color;
      }).reduce(function(memo, e) {
        if(memo.indexOf(e) === -1) {
          memo.push(e);
        }
        return memo;
      }, []).forEach(function(e) {
        var parts = e.split('|');
        var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
        legend.appendChild(entry);
      });
      this.el.appendChild(legend);
    }
  
    Calendar.prototype.nextMonth = function() {
      this.current.add('months', 1);
      this.next = true;
      this.draw();
    }
  
    Calendar.prototype.prevMonth = function() {
      this.current.subtract('months', 1);
      this.next = false;
      this.draw();
    }
  
    window.Calendar = Calendar;
  
    function createElement(tagName, className, innerText) {
      var ele = document.createElement(tagName);
      if(className) {
        ele.className = className;
      }
      if(innerText) {
        ele.innderText = ele.textContent = innerText;
      }
      return ele;
    }
  }();
  
  !function() {
    var data = [
      { eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
      { eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange' },
      { eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange' },
      { eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },
  
      { eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
      { eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
      { eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
      { eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },
  
      { eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
      { eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
      { eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
      { eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },
  
      { eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
      { eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
      { eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
      { eventName: 'Startup Weekend', calendar: 'Other', color: 'green' }
    ];
  
    
  
    function addDate(ev) {
      
    }
  
    var calendar = new Calendar('#calendar', data);
  
  }();
  