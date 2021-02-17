const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none');
  }, 2000);
})

let APIKEY = "60213a203f9eb665a16892a7";

$(document).ready(function () {
    
    $('#tooltip').hide();
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
                $("#signup-btn").attr("disabled", false);
                $("#signup-loading"). attr("hidden", true);
            }else{
                //console.log("Exisitng user found")
                //alert("Exisitng user found!");
                const input = document.querySelector('#signup-username');
                const tooltip = document.querySelector('#tooltip');
                
                Popper.createPopper(input, tooltip, {
                    placement: 'right',
                });
                $('#tooltip').show();              
                setTimeout(function(){ $('#tooltip').hide(); }, 3000);
                $("#signup-form").trigger("reset");
                $("#signup-btn"). attr("disabled", true);
                $("#signup-loading"). attr("hidden", false);
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
                "dailies":'{"Daily Ystd":"'+ystdDate+'","Daily Ystd2":"'+ystdDate+'","Daily Tdy":"'+currentDate+'","Daily Tmrw":"'+tmrwDate+'"}',
                "todo":'{"Todo Ystd":["'+ystdDate+'",0],"Todo Tdy":["'+currentDate+'",0],"Todo Tmrw":["'+tmrwDate+'",0]}',
                "shop":'{"test":2}',
                "maxhealth":50,
                "maxexperience":50,
                "lastevolve":0,
                "skilltree":'{"prg2":{"CsSyn":"new"},"db":{"rel":"new"},"id":{},"as":{}}'
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
                sessionStorage.setItem("skilltree",response.skilltree);
                window.location.href = "selection.html";       
            });                       
        }else{
            alert("Wrong input!");
            $("#signup-form").trigger("reset");
            $("#signup-btn"). attr("disabled", true);
            $("#signup-loading"). attr("hidden", false);
        }
    });
 
});   

