//Testing PokeAPI 

var settings = {
    "url": "https://pokeapi.co/api/v2/pokemon/pikachu",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Cookie": "__cfduid=d15aa94cfa2c415a3913143f52535964c1612860365"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });