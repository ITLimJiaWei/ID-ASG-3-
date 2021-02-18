$("#logout-btn").on("click", function () { //logout
  sessionStorage.clear();
  window.location.href = "index.html";
})

$(document).ready(function () {

  $("#logout-btn").on("click", function () { //logout
    sessionStorage.clear();
    window.location.href = "index.html";
  })

});
