//Testing PokeAPI 
let APIKEY = "60213a203f9eb665a16892a7";

$(document).ready(function () {
  let avatar;
  let avatar_img_url;
  var starters = ["pikachu","charmander","bulbasaur","squirtle"]
  var i;
  for (i = 0; i < starters.length; i++) {
    let pokemonName = starters[i];
    let url = "https://pokeapi.co/api/v2/pokemon/"+pokemonName;
    var settings = {
      "url": url,
      "method": "GET",
      "timeout": 0,
      
    };
    
    $.ajax(settings).done(function (response) {
      //console.log(response)
      let id = response.id;
      //console.log(id);
      let sprite = response.sprites.front_default;
      //sprite = response.sprites.other["official-artwork"].front_default; //Official artwork ver
      //console.log(sprite);
      let elementid = "#" + pokemonName;
      $(elementid).attr("src",sprite);
      avatar_img_url=sprite;
    });
  }
  
  $(".card").on("click",function(){
    $(".card").removeClass('selected');
    $(this).addClass('selected');
    $("#select-btn").attr("disabled", false);
    avatar = $(this).attr("data-pokemon");
    avatar_img_url=$("img",this).attr("src");
    //console.log(avatar_img_url);
  });

  $("#select-btn").on("click",function(){
    let id = sessionStorage.getItem("id");
    //console.log(avatar);

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
        sessionStorage.setItem("avatar_img_url",avatar_img_url);
        window.location.href = "home.html";
    });
  });
});