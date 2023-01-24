window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var i = 0;
var txt = 'Hi! Welcome to my website, my name is Keri. Nice to meet you :)';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("section1Text").innerHTML += txt.charAt(i);
    if (i == 3) {
        document.getElementById("section1Text").innerHTML += "<br />";
    }   
    if (i == 42) {
        document.getElementById("section1Text").innerHTML += "<br />";
    }   
    i++;
    setTimeout(typeWriter, speed);
  }
}

function scrollDoc() { 
  window.scrollBy(0, 700);

}

