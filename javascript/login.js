let APIKEY = "60213a203f9eb665a16892a7";


//Login Page
$(document).ready(function () {
    $('#tooltip').hide();
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
                //alert("No exisitng user found");
                const input = document.querySelector('#login-username');
                const tooltip = document.querySelector('#tooltip');
                Popper.createPopper(input, tooltip, {
                    placement: 'right',
                });
                $('#tooltip').show();              
                setTimeout(function(){ $('#tooltip').hide(); }, 3000);
                $("#login-form").trigger("reset");
                $("#login-btn"). attr("disabled", true);
                $("lottie-player"). attr("hidden", false);
            }else{
                $("#login-btn"). attr("disabled", false);
                $("#login-loading"). attr("hidden", true);
                
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
                sessionStorage.setItem("skilltree",response[0].skilltree);
                window.location.href = "home.html";       
            });
        }else{
            alert("Wrong input!");
            $("#login-form").trigger("reset");
            $("#login-btn"). attr("disabled", true);
            $("lottie-player"). attr("hidden", false);
        }
    });
});   
