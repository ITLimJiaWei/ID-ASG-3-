let APIKEY = "60213a203f9eb665a16892a7";

let modules = {"prg2":{"CsSyn":"C# Syntax","CsI/O":"C# Input/Output","OOP":"Object Oriented Programming","Inh":"Inheritance","Git":"Version Control","AC&I":"Abstract Classes & Interfaces"},
"db":{"rel":"Relations"},
"id":{},
"as":{}};
sessionStorage.setItem("skilltree",'{"prg2":{"CsSyn":"C# Syntax"}}')
$(document).ready(function () {
    let skilltree =JSON.parse(sessionStorage.getItem("skilltree"));
    let coins = parseInt(sessionStorage.getItem("coins"));
    $("#nugget-count").text(coins);
    $("button").remove();
    for (var module in modules){
        let id ="#"+ module;
        for (var skill in modules[module]){
            $(id).append('<button type="button" id="'+skill+'" class="skill-content skill-btn" >'+modules[module][skill]+'</button>');
        }
    }
    for (var module in skilltree){
        for (var skill in skilltree[module]){
            let id ="#"+ skill;
            if(skilltree[module][skill]=="true"){
                $(id).addClass("learnt")
            }    
        }
    }
   
    function updateSkillTree(){
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
        $.ajax(settings).done(function (r) {
            console.log(r);
        });
    }
    $('.skill-content').on("click",function(e){
        e.preventDefault();
        if ($(this).hasClass("learnt")){
            $(this).removeClass("learnt");
            let moduleid = $(this).parent().attr("id");
            let skillid = $(this).attr("id");
            skilltree[moduleid][skillid]="new";
            coins-=100;
        }else{
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