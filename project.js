// Get the button element
var button = document.getElementById("scroll-to-top");

// Listen for the scroll event on the window
window.addEventListener("scroll", function() {
  // If the user has scrolled past 200 pixels, show the button
  if (window.pageYOffset > 200) {
    document.getElementById("scroll-to-top").style.display = "block";
  } else {
    // Otherwise, hide the button
    document.getElementById("scroll-to-top").style.display = "none";
  }
});

// Listen for clicks on the button
$(document).ready(function() {
    // When the user clicks on the button, scroll to the top of the page
    $("#scroll-to-top").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  });