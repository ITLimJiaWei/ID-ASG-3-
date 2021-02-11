//Testing PokeAPI 

$(document).ready(function () {

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
      console.log(response)
      let id = response.id;
      console.log(id);
      let sprite = response.sprites.front_default;
      //sprite = response.sprites.other["official-artwork"].front_default; //Official artwork ver
      console.log(sprite);
      let elementid = "#" + pokemonName;
      $(elementid).attr("src",sprite);
    });
  }

  });