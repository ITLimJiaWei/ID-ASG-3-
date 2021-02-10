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
            console.log("Checking for user");
            console.log(response);
            if(jQuery.isEmptyObject(response)){
                console.log("No exisitng user found, proceed");
                $("#signup-btn"). attr("disabled", false);
            }else{
                console.log("Exisitng user found")
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
            let jsondata = {
                "username": signupUsername,
                "password":signupPassword,
                "level":1,
                "experience":0,
                "health":100,
                "coins":0,
                "dailies":"test",
                "todo":"test",
                "shop":"test"
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
                console.log("Creating new user");            
                sessionStorage.setItem("username",signupUsername)
                sessionStorage.setItem("password",signupPassword)  
                window.location.href = "home.html";       
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
                sessionStorage.setItem("username",loginUsername)
                sessionStorage.setItem("password",loginPassword)  
                window.location.href = "home.html";       
            });
        }else{
            alert("Wrong input!");
        }
    });
});
