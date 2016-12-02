document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('commercial-video').addEventListener('loadedmetadata', function() {
    this.currentTime = 47;
  }, false);
});
