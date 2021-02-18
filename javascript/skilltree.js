let APIKEY = "60213a203f9eb665a16892a7";

let modules = {"prg2":{"CsSyn":"C# Syntax","CsI/O":"C# Input/Output","OOP":"Object Oriented Programming","Inh":"Inheritance","Git":"Version Control","AC&I":"Abstract Classes & Interfaces"},
"db":{"rel":"Relations"},
"id":{},
"as":{}};   //sample modules and skills
$(document).ready(function () {
    let skilltree =JSON.parse(sessionStorage.getItem("skilltree"));
    let coins = parseInt(sessionStorage.getItem("coins"));  //load coins (was not done in a common js due to need for manipulation in some pages)
    $("#nugget-count").text(coins);
    $("button").remove();
    for (var module in modules){    //append modules
        let id ="#"+ module;
        for (var skill in modules[module]){ //append skills into modules
            $(id).append('<button type="button" id="'+skill+'" class="skill-content skill-btn" >'+modules[module][skill]+'</button>');
        }
    }
    for (var module in skilltree){  //check if user has already learnt skills, uypdate skill accordingly
        for (var skill in skilltree[module]){
            let id ="#"+ skill;
            if(skilltree[module][skill]=="learnt"){
                console.log(id);
                $(id).addClass("learnt")
            }    
        }
    }
   
    function updateSkillTree(){ //update user data
        id = sessionStorage.getItem("id",id);
        let jsondata = {
            "coins":coins,
            "skilltree":JSON.stringify(skilltree)
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
        $.ajax(settings).done();
    }

    $('.skill-content').on("click",function(e){ //skill on click, update skill as learnt
        e.preventDefault();
        if ($(this).hasClass("learnt")){        //if already learnt, means un-learning(cancelling)
            $(this).removeClass("learnt");
            let moduleid = $(this).parent().attr("id");
            let skillid = $(this).attr("id");
            skilltree[moduleid][skillid]="new";
            coins-=100;
        }else{  //user learnt new skill
            $(this).addClass("learnt");
            let moduleid = $(this).parent().attr("id");
            let skillid = $(this).attr("id");
            coins+=100;
            skilltree[moduleid][skillid]="learnt";
            $('#skilltreeModal').modal({ show: true});  
        }
        sessionStorage.setItem("skilltree",JSON.stringify(skilltree));
        sessionStorage.setItem("coins",coins);
        updateSkillTree();
        $("#nugget-count").text(coins);
    })
});



//{"C#Syn":"C# Syntax","C#I/O":"C# Input/Output","OOP":"Object Oriented Programming","Inh":"Inheritance","Git":"Version Control","AC&I":"Abstract Classes & Interfaces"};