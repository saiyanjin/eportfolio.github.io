function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;
    progressBar.style.width = scrolledPercentage + '%';
}

window.addEventListener('scroll', updateProgressBar);
window.addEventListener('resize', updateProgressBar);

window.addEventListener('load', updateProgressBar);