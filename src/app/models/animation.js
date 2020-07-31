let bkl = document.getElementById('alm');
bkl.className = 'app-loading-mask alm-hide-ani';

// you can call this function once your app is fully loaded.
setTimeout(function () {
  bkl.style.display = 'none';
}, 50000);