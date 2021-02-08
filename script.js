let APIKEY = "60213a203f9eb665a16892a7";
let currentUser;

$(document).ready(function () {

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
            if(checkUser(signupUsername)){
                $.ajax(settings).done(function (response) {
                    console.log("Creating new user");            
                    getUser(signupUsername,signupPassword);   
                    //window.location.href = "home.html";       
                });        
            }else{
                console.log("User exists");
            }      
        }else{
            alert("Wrong input!");
        }
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
                currentUser=response;
                //window.location.href = "home.html";
            });
        }else{
            alert("Wrong input!");
        }
    });
});

function getUser(username,password){
    let query = '"username":"'+username+'","password":"'+password+'"';
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
        currentUser=response;
    });
}

function checkUser(username){
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
            return false;
        }else{
            console.log("Exisitng user found")
            return true;
        }
    });
}
