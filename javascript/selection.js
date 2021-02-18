//Testing PokeAPI 
let APIKEY = "60213a203f9eb665a16892a7";

$(document).ready(function () {
  let avatar;
  let avatar_img_url;
  var starters = ["pichu","charmander","bulbasaur","squirtle"]  //preset 4 starters (pichu was used instead of pikachu due to api issues)
  var i;
  for (i = 0; i < starters.length; i++) {   //append avatar sprites into screen
    let pokemonName = starters[i];
    let url = "https://pokeapi.co/api/v2/pokemon/"+pokemonName;
    var settings = {
      "url": url,
      "method": "GET",
      "timeout": 0,
      
    };
    $.ajax(settings).done(function (response) {
      let sprite = response.sprites.front_default;
      let elementid = "#" + pokemonName;
      $(elementid).attr("src",sprite);
      avatar_img_url=sprite;
    });
  }
  
  $(".card").on("click",function(){ //select avatar
    $(".card").removeClass('selected');
    $(this).addClass('selected');
    $("#select-btn").attr("disabled", false);
    avatar = $(this).attr("data-pokemon");
    avatar_img_url=$("img",this).attr("src");;
  });

  $("#select-btn").on("click",function(){ //confirm selection, bind avatar img
    let id = sessionStorage.getItem("id");
    let jsondata = {
      "avatar": avatar,
      "avatar_img_url": avatar_img_url
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
        //console.log(response);
        sessionStorage.setItem("avatar",avatar);
        sessionStorage.setItem("avatar_img_url",avatar_img_url);  //bind avatar image
        window.location.href = "home.html"; //href to home page
    });
  });
});