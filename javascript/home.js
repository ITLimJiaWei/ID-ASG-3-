let APIKEY = "60213a203f9eb665a16892a7";
const splash = document.querySelector('.splash');

var bleep = new Audio();
bleep.src = "sounds/completetask_0.mp3";

function toTitleCase(str) {     //from stackoverflow
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

$(document).ready(function () {

    let avatar_img_url = sessionStorage.getItem("avatar_img_url");
    let avatar = sessionStorage.getItem("avatar");
    let coins = parseInt(sessionStorage.getItem("coins"));
    let username = sessionStorage.getItem("username");
    let level = parseInt(sessionStorage.getItem("level"));
    let health = parseInt(sessionStorage.getItem("health"));
    let maxhealth = parseInt(sessionStorage.getItem("maxhealth"));
    let healthbar = health / maxhealth * 100;
    let experience = parseInt(sessionStorage.getItem("experience"));
    let maxexperience = parseInt(sessionStorage.getItem("maxexperience"));
    let experiencebar = experience / maxexperience * 100;
    let lastevolve = parseInt(sessionStorage.getItem("lastevolve"));
    let overdue = [];   //overdue tasks for later



    function updatePage() {  //updates player information
        healthbar = health / maxhealth * 100;
        experiencebar = experience / maxexperience * 100;
        $("#home-starter-pic").attr("src", avatar_img_url);
        $("#nugget-count").text(coins);
        $("#home-username").text(username);
        $("#home-level").text("Level " + level);
        $("#hp-number").text(health + "/" + maxhealth);
        $(".bg-danger").width(healthbar + "%");
        $("#xp-number").text(experience + "/" + maxexperience);
        $(".bg-warning").width(experiencebar + "%");
    }

    let dailies = JSON.parse(sessionStorage.getItem("dailies"));
    let todos = JSON.parse(sessionStorage.getItem("todo"));
    let shop = JSON.parse(sessionStorage.getItem("shop"));

    function beforeToday(taskDate) { //check if date was before today
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);
        if (taskDate < currentDate) {
            return 1;
        } else if (taskDate.getTime() == currentDate.getTime()) {
            return 0;
        } else {
            return -1;
        }
    }

    function updateStats() {
        if (health == 0) {  //0 health, die
            $(".modal-body").text("You have died!");
            $('#homeModal').modal({ show: true });
            health = 10;
            experience = 0;
        }
        if (experience >= maxexperience) { //leveling up
            $(".modal-body").text("You have leveled up!");
            $('#homeModal').modal({ show: true });
            maxhealth += 5;
            health = maxhealth;
            level += 1;
            let leftover = experience - maxexperience;    //handle leftover xp, push to next level
            experience = leftover;
            maxexperience += 5;
        }
        if (level == 10 || level == 20) { //evolve at level 10 and 20
            if (lastevolve != level) {
                lastevolve = level;
                evolve();
            }
        }
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "health": health,
            "maxhealth": maxhealth,
            "experience": experience,
            "maxexperience": maxexperience,
            "level": level,
            "coins": coins,
            "avatar": avatar,
            "avatar_img_url": avatar_img_url,
            "lastevolve": lastevolve
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/" + id,
            "method": "PATCH",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };
        $.ajax(settings).done(function (response) {
            sessionStorage.setItem("avatar", response.avatar);
            sessionStorage.setItem("avatar_img_url", response.avatar_img_url);
            sessionStorage.setItem("health", response.health);
            sessionStorage.setItem("experience", response.experience);
            sessionStorage.setItem("level", response.level);
            sessionStorage.setItem("coins", response.coins);
            sessionStorage.setItem("maxhealth", response.maxhealth);
            sessionStorage.setItem("maxexperience", response.maxexperience);
            sessionStorage.setItem("lastevolve", response.lastevolve);
        });
        updatePage();
    }

    function updateDailies() {
        $("#home-daily-column>div").remove();   //empty the div
        for (var daily in dailies) {    //apending dailies to div
            let currentDate = new Date();
            let utcDate = dailies[daily];    //convert utc date to local date due to JSON.stringify auto conversion
            let localDate = new Date(utcDate);
            dailies[daily] = localDate;
            let check = beforeToday(localDate);
            if (check == 1) {  //task expired, penalty
                overdue.push(daily);
                health -= 5; //penalty
                updateStats();
                dailies[daily] = currentDate; //update date
                $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" onmousedown="bleep.play()" class="checkbox" data-item="' + daily + '"></div><div class="flex-item2">' + daily + '</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="' + daily + '">Delete</button></div></div></div></div>');
            } else if (check == 0) { //due today
                $("#home-daily-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" onmousedown="bleep.play()"class="checkbox" data-item="' + daily + '"></div><div class="flex-item2">' + daily + '</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="' + daily + '">Delete</button></div></div></div></div>');

            }//due in future = skip
        }
        sessionStorage.setItem("dailies", JSON.stringify(dailies));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "dailies": JSON.stringify(dailies)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/" + id,
            "method": "PATCH",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };
        $.ajax(settings).done();
    }

    function updateTodo() {
        $("#home-todo-column>div").remove();    //empty the div
        for (var todo in todos) {   //appending todos to div
            let utcDate = todos[todo][0];
            let localDate = new Date(utcDate); //convert utc date to local date due to JSON.stringify auto conversion
            todos[todo][0] = localDate;
            let dateInfo = "";
            let currentDate = new Date();
            if (localDate.getFullYear() == currentDate.getFullYear()) {  //check if date of task is this year
                dateInfo = " " + (localDate.getMonth() + 1) + "-" + localDate.getDate();
            }
            if (todos[todo][1] == 0) { //check if task is done already
                let check = beforeToday(localDate);
                if (check == 1) {  //task expired, penalty
                    overdue.push(todo);
                    health -= 5; //some penalty
                    updateStats();
                    todos[todo][1] = 1;
                } else if (check == 0) { //due today
                    $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" onmousedown="bleep.play()" class="checkbox" data-item="' + todo + '"></div><div class="flex-item2">' + todo + dateInfo + '</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="' + todo + '">Delete</button></div></div></div></div>');
                } else {  //due in future
                    $("#home-todo-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" onmousedown="bleep.play()" class="checkbox" data-item="' + todo + '"></div><div class="flex-item2">' + todo + dateInfo + '</div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="' + todo + '">Delete</button></div></div></div></div>');
                }
            }
        }
        sessionStorage.setItem("todo", JSON.stringify(todos));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "todo": JSON.stringify(todos)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/" + id,
            "method": "PATCH",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };
        $.ajax(settings).done();
    }

    function updateShop() {
        $("#home-shop-column>div").remove();        //empty the div
        $("#home-shop-column").append('<div class="flex-container" id="rarecandy"><div class="flex-item1"><input type="checkbox" class="checkbox" onmousedown="bleep.play()" ></div><div class="flex-item2"><img src="pictures/rare-candy.png" alt="Rare Candy Picture">+1 Level</div><div class="flex-item3"><div class="flex-container-shop"><div class="nugget-count-class">100</div><img src="pictures/nugget.png" alt="PokePlanner Currency Icon"> </div></div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" >Delete</button></div></div></div></div>');
        for (var item in shop) {        //apending shop items
            let cost = shop[item];
            $("#home-shop-column").append('<div class="flex-container"><div class="flex-item1"><input type="checkbox" class="checkbox" onmousedown="bleep.play()" data-item="' + item + '"></div><div class="flex-item2">' + item + '</div><div class="flex-item3"><div class="flex-container-shop"><div class="nugget-count-class">' + cost + '</div><img src="pictures/nugget.png" alt="PokePlanner Currency Icon"> </div></div><div class="flex-item3"><div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"><button type="button" class="btn btn-light btn-sm delete-button dropdown-item" data-item="' + item + '">Delete</button></div></div></div></div>');
        }
        sessionStorage.setItem("shop", JSON.stringify(shop));
        let id = sessionStorage.getItem("id");
        let jsondata = {
            "shop": JSON.stringify(shop)
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg3-3b63.restdb.io/rest/pokeplanner/" + id,
            "method": "PATCH",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };
        $.ajax(settings).done();
    }

    updatePage();
    updateDailies();
    updateTodo();
    updateShop();
    checkOverdue();
    setTimeout(newPlayerGuide, 6000);

    function newPlayerGuide() {
        if (experience == 0 && maxexperience == 50) {  //show welcome screen if player is new
            $("#homeModalTitle").text("Welcome to PokéPlanner");
            $(".modal-body").html("<h5><u>Description</u></h5><p>Here you can keep track of your tasks and even reward yourself all while having fun! This producitvity site is only as useful as how committed you are to it, so pleasepace your all your Daillies, To Do's, Rewards and have fun!</p><h5><u>Daillies</u></h5><p>These are tasks that repeat daily and are worth 10 gold and experience points</p><h5><u>To Do's</u></h5><p>Unlike Daillies, To Do's are worth more gold and experience points at 20 each but can only be completed once.</p><h5><u>Shop</u></h5><p>Here you can reward yourself with the gold you worked so hard to earn for a 'Cheat Day' or a rare candy to level up your character albeit for a high price of 100 gold. You caneven set reward costs to negative integers if you really require that extra gold and rest!</p><h5><u>Evolution</u></h5><p>Your starter pokemon will evolve at levels 10 and 20. However, health only regenerates daily so remember to complete your tasks!</p>");
            $('#homeModal').modal({ show: true });
        }
    }
    function checkOverdue() {
        if (overdue.length != 0) {  //overdue tasks alert will only run once
            let overduestring = "";
            for (let i = 0; i < overdue.length; i++) {
                overduestring += overdue[i] + ", ";
            }
            let overduestring2 = overduestring.slice(0, -2);
            $("#homeModalTitle").text("Oaks Words echoed...");
            $(".modal-body").text("You didn't do: " + overduestring2);
            $('#homeModal').modal({ show: true });
        }
    }

    $("#home-daily-add").keypress(function (event) {     //dailies input 
        if (event.keyCode === 13) {
            let daily = $("#home-daily-add").val();
            if (daily != "") {
                let currentDate = new Date();
                dailies[daily] = currentDate;
                updateDailies();
                $("#home-daily-add").val('');
            }
        }
    });


    $("#home-todo-add").keypress(function (event) {  //todo input
        if (event.keyCode === 13) {
            let value = $("#home-todo-add").val();
            if (value != "") {
                let todo = value.split(",");
                let dueDate = Date.parse(todo[1]);
                if (isNaN(dueDate)) {    //if no date is stated, date will be maxed out
                    let maxDate = new Date("9999-12-31T23:59:59");
                    todos[todo[0]] = [maxDate, 0];
                } else {

                    todos[todo[0]] = [dueDate, 0];
                }
                updateTodo();
                $("#home-todo-add").val('');
            }
        }
    });

    $("#home-shop-add").keypress(function (event) {  //shop input
        if (event.keyCode === 13) {
            let value = $("#home-shop-add").val();
            if (value != "") {
                let reward = value.split(",");
                let item = reward[0];
                let cost = reward[1];
                if (isNaN(cost)) {
                    shop[item] = 0;
                } else {
                    shop[item] = cost;
                }
                updateShop();
                $("#home-shop-add").val('');
            }
        }
    });

    $(".home-middle-container").on("click", function (e) {       //check box listener and delete button listener
        let parentid = $(e.target).parent().parent().parent().attr("id");
        let item = $(e.target).data("item");
        if (e.target.checked) {     //if is check box
            if (parentid == "home-daily-column") {   //handler for daily
                let tmrwDate = new Date();
                tmrwDate.setDate(tmrwDate.getDate() + 1);
                dailies[item] = tmrwDate;
                $(e.target).parent().parent().remove();
                experience += 10;
                coins += 10;
                updateStats();
                updateDailies();
            }
            else if (parentid == "home-todo-column") {    //handler for todo
                todos[item][1] = 1;
                experience += 20;
                coins += 20;
                updateStats();
                updateTodo();
            } else if (parentid == "home-shop-column") {   //handler for shop
                if ($(e.target).parent().parent().attr("id") == "rarecandy") {  //rare candy handler
                    let cost = 100;
                    e.preventDefault();
                    if (coins >= cost) {
                        coins -= cost;
                        level += 1;
                        updateStats();
                    } else {
                        $("#homeModalTitle").text("Nurse Joy");
                        $(".modal-body").text("Insufficient nuggets!");
                        $('#homeModal').modal({ show: true });
                        $(e.target).prop("checked", false);
                    }
                } else {
                    let cost = shop[item];
                    if (coins >= cost) {
                        coins -= shop[item];
                        delete shop[item];
                        updateStats();
                        updateShop();
                    } else {
                        $(".modal-body").text("Insufficient nuggets!");
                        $('#homeModal').modal({ show: true });
                        $(e.target).prop("checked", false);
                    }
                }
            }
        } else if ($(e.target).hasClass("delete-button")) {   //if is delete button
            parentid = $(e.target).parent().parent().parent().parent().parent().attr("id");
            if (parentid == "home-daily-column") {      //handler for daily
                delete dailies[item];
                updateDailies();
            }
            else if (parentid == "home-todo-column") {    //handler for todo
                delete todos[item];
                updateTodo();
            } else if (parentid == "home-shop-column") {   //handler for shop
                delete shop[item];
                updateShop();
            }
        }
    });

    function evolve() {                          //evolve was originally 1 function but had to be split up due to async issues
        let avatarName = toTitleCase(avatar);
        $("#homeModalTitle").text("Dum Dum Dum Dum....");
        $(".modal-body").text(avatarName + " is evolving!");        //EVOLVE MODAL
        $('#homeModal').modal({ show: true });
        jQuery.ajaxSetup({ async: false });
        let url = "https://pokeapi.co/api/v2/pokemon/" + avatar;
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            let url = response.species.url;
            evolve2(url);
        });
    }
    function evolve2(url) {
        let settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            evolve3(response.evolution_chain.url);
        });
    }
    function evolve3(url) {
        let settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            if (response.chain.evolves_to[0].species.name != avatar) {
                avatar = response.chain.evolves_to[0].species.name;
            } else if (avatar != response.chain.evolves_to[0].evolves_to[0].species.name) {
                avatar = response.chain.evolves_to[0].evolves_to[0].species.name;
            }
            let url = "https://pokeapi.co/api/v2/pokemon/" + avatar;
            evolve4(url);
        });
    }
    function evolve4(url) {
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            let sprite = response.sprites.front_default;
            $("#home-starter-pic").attr("src", sprite);
            avatar_img_url = sprite;
        });
        updateStats();
    }
});