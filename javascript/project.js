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

  $(document).ready(function() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = (scroll / height) * 100;
      $(".progress-bar").css("width", progress + "%");
    });
  });

$(document).ready(function() {
  $('.image').click(function() {
    // Get the URL of the clicked image
    var imageSrc = $(this).attr('src');

    // Set the URL of the expanded image to the URL of the clicked image
    $('.image-expanded img').attr('src', imageSrc);

    // Get the expanded image and set it to visible
    $('.image-expanded').addClass('visible');

    // Disable scrolling on the body while the image is expanded
    $('body').css('overflow', 'hidden');
  });

  $('.close-button').click(function() {
    // Get the expanded image and set it to invisible
    $('.image-expanded').removeClass('visible');

    // Enable scrolling on the body again
    $('body').css('overflow', 'auto');
  });
});
