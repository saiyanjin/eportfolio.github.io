// Get the progress bar and container elements
var progressBar = document.getElementById('progress-bar');
var progressContainer = document.getElementById('progress-container');

// Calculate the scroll progress and update the progress bar
function updateProgressBar() {
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;

  var progress = (scrollPosition / (bodyHeight - windowHeight)) * 100;
  progressBar.style.width = progress + '%';
}

// Update the progress bar when the page is scrolled
window.addEventListener('scroll', function () {
  updateProgressBar();
});

// Update the progress bar when the window is resized
window.addEventListener('resize', function () {
  updateProgressBar();
});

// Update the progress bar when the page is fully loaded (in case of page refresh)
window.addEventListener('load', function () {
  updateProgressBar();
});



