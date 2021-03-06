const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e) => { //loading screen
    setTimeout(() => {
        splash.classList.add('display-none');
    }, 2000);
});

let APIKEY = "60213a203f9eb665a16892a7";

$(document).ready(function () {

    $('.tooltips').hide();  //hide tooltips
    $("#signup-username").on("focusout", function () { //check if user exists
        let username = $("#signup-username").val();
        let query = '"username":"' + username + '"';
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner?q={" + query + "}",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            }
        };
        $.ajax(settings).done(function (response) {
            if (jQuery.isEmptyObject(response)) { //user dosent exist, enable button
                $("#signup-btn").attr("disabled", false);
                $("#signup-loading").attr("hidden", true);
            } else {  //user exists, disable button and prompt 
                const input = document.querySelector('#signup-username');
                const tooltip = document.querySelector('#username-tooltip');
                Popper.createPopper(input, tooltip, {
                    placement: 'right',
                });
                $('#username-tooltip').show();
                setTimeout(function () { $('#username-tooltip').hide(); }, 3000);
                $("#signup-form").trigger("reset");
                $("#signup-btn").attr("disabled", true);
                $("#signup-loading").attr("hidden", false);
            }
        });
    });

    $("#signup-btn").on("click", function (e) {
        e.preventDefault();
        let signupUsername = $("#signup-username").val();
        let signupPassword = $("#signup-password").val();
        let signupConfirmPassword = $("#signup-confirmpassword").val();
        let validInput = false;
        if (signupUsername) { //check if input is blank
            if (signupPassword != "") {
                if (signupPassword == signupConfirmPassword) {
                    validInput = true;
                }
            }
        }

        let modules = {
            "prg2": { "CsSyn": "C# Syntax", "CsI/O": "C# Input/Output", "OOP": "Object Oriented Programming", "Inh": "Inheritance", "Git": "Version Control", "AC&I": "Abstract Classes & Interfaces" },
            "db": { "sqls": "Sql Syntax", "ermodel": "Entity Relation Model", "con": "Constraints", "attr": "Attributes", "rt": "Relational Theory", "dt": "Data Dictionary" },
            "id": { "HTML": "HTML", "CSS": "CSS", "ACSS": "Advanced CSS", "JS": "Javascript", "Jqaj": "JQuery AJAX", "Bts": "Bootstrap" },
            "as": { "bp": "Binomial & Poisson Dist", "n": "Normal Distribution", "s": "Sampling Distribution", "es": "Estimation", "Hypo": "Hypothesis Testing", "rc": "Regression & Correlation" }
        };   //sample modules and skills

        if (validInput) {
            let currentDate = new Date();   //this is sample data for every new user
            // let ystdDate = new Date();   //dev testing data
            // ystdDate.setDate(ystdDate.getDate() - 1);
            // let tmrwDate = new Date();
            // tmrwDate.setDate(tmrwDate.getDate() + 1);
            let jsondata = {
                "username": signupUsername,
                "password": signupPassword,
                "level": 1,
                "experience": 0,
                "health": 50,
                "coins": 0,
                "dailies": '{"Check In":"' + currentDate + '"}',
                "todo": '{"Finish a task":["' + currentDate + '",0]}',
                "shop": '{"Snack Bar":50}',
                "maxhealth": 50,
                "maxexperience": 50,
                "lastevolve": 0,
                "skilltree": JSON.stringify(modules)
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
                "beforeSend": function () {
                    $("#signup-form").trigger("reset");
                }
            };

            $.ajax(settings).done(function (response) {     //save data to sessionStorage        
                sessionStorage.setItem("username", signupUsername);
                sessionStorage.setItem("password", signupPassword);
                sessionStorage.setItem("id", response._id);
                sessionStorage.setItem("avatar", response.avatar);
                sessionStorage.setItem("avatar_img_url", response.avatar_img_url);
                sessionStorage.setItem("health", response.health);
                sessionStorage.setItem("experience", response.experience);
                sessionStorage.setItem("level", response.level);
                sessionStorage.setItem("coins", response.coins);
                sessionStorage.setItem("shop", response.shop);
                sessionStorage.setItem("todo", response.todo);
                sessionStorage.setItem("dailies", response.dailies);
                sessionStorage.setItem("maxhealth", response.maxhealth);
                sessionStorage.setItem("maxexperience", response.maxexperience);
                sessionStorage.setItem("lastevolve", response.lastevolve);
                sessionStorage.setItem("skilltree", response.skilltree);
                window.location.href = "selection.html";     //href to avatar selection 
            });
        } else {  //invalid input, prompt user
            const input = document.querySelector('#signup-password');
            const tooltip = document.querySelector('#password-tooltip');
            Popper.createPopper(input, tooltip, {
                placement: 'right',
            });
            $('#password-tooltip').show();
            setTimeout(function () { $('#password-tooltip').hide(); }, 3000);
            $("#signup-form").trigger("reset");
            $("#signup-btn").attr("disabled", true);
            $("#signup-loading").attr("hidden", false);
        }
    });
});

