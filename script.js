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
                "shop":'{"shop1":[2359]}',
                "maxhealth":50,
                "maxexperience":50
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
                window.location.href = "home.html";       
            });
        }else{
            alert("Wrong input!");
        }
    });
    
    //Home Page
    let avatar_img_url = sessionStorage.getItem("avatar_img_url");
    $("#home-starter-pic").attr("src",avatar_img_url);
    
    let username = sessionStorage.getItem("username");
    $("#home-username").text(username);

    let coins = sessionStorage.getItem("coins");
    $("#nugget-count").text(coins);

    let health = sessionStorage.getItem("health");
    let maxhealth = sessionStorage.getItem("maxhealth");
    $("#hp-number").text(health+"/"+maxhealth);
    let healthbar = health/maxhealth*100;
    $(".bg-danger").width(healthbar+"%");

    let experience = sessionStorage.getItem("experience");
    let maxexperience = sessionStorage.getItem("maxexperience");
    $("#xp-number").text(experience+"/"+maxexperience);
    let experiencebar = experience/maxexperience*100;
    $(".bg-warning").width(experiencebar+"%");

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
                dailies[daily] = currentDate; //update date
                $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+daily+'">Delete</button></div></div>');
            }else if (check ==0){ //due today
                $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+daily+'"></div><div class="flex-item2">'+daily+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+daily+'">Delete</button></div></div>');
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
                delete todos[todo];
            }else if (check ==0){ //due today
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>');      
            }else{  //due in future
                $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+todo+'"></div><div class="flex-item2">'+todo+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+todo+'">Delete</button></div></div>');      
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
            $("#home-shop-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" data-item="'+item+'"></div><div class="flex-item2">'+item+'</div><div class="flex-item3"><button type="button" class="btn btn-light btn-sm delete-button" data-item="'+item+'">Delete</button></div></div>')        
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
           todos[todo[0]] = dueDate;
           updateTodo();
           $("#home-todo-add").val('');
           $(':focus').blur()          
        } 
    }); 

    $("#home-shop-add").keypress(function(event) { 
        if (event.keyCode === 13) { 
           let item = $("#home-shop-add").val();
           shop[item] = [2359];
           updateShop();
           $("#home-shop-add").val('');
           $(':focus').blur()          
        } 
    }); 


    $(".home-middle-container").on("change click",function(e) {       //check box listener and delete button listener
        let parentid = $(e.target).parent().parent().parent().attr("id");    
        let item = $(e.target).data("item");  
        let currentDate = new Date();
        if(e.target.checked) {     
            if(parentid =="home-daily-column"){   
                let tmrwDate  = new Date();
                tmrwDate.setDate(tmrwDate.getDate()+1);   
                dailies[item] = tmrwDate;
                console.log($(e.target).parent().parent());
                $(e.target).parent().parent().remove();
                updateDailies();    //json stringify converts time to utc
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
        }else if ($(e.target).hasClass("btn")){
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
});
