const player = document.querySelector('.player');
const video = player.querySelector('.viewer'),
  progress = player.querySelector('.progress'),
  progressBar = player.querySelector('.progress__filled'),
  toggle = player.querySelector('.toggle'),
  skipButtons = player.querySelectorAll('[data-skip]'),
  ranges = player.querySelectorAll('.player__slider'),
  fullscreen = player.querySelector('.fullscreen');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  if (document.webkitFullscreenElement !== null) {
    if (document.exitFullscreen)
      document.exitFullscreen();
    else if (document.webkitExitFullscreen)
      document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)
      document.mozCancelFullScreen();
    else if (document.msExitFullscreen)
      document.msExitFullscreen();
  } else {
    if (player.webkitRequestFullScreen) {
      player.webkitRequestFullScreen()
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen()
    } else if (player.msRequestFullScreen) {
      player.msRequestFullScreen()
    } else if (player.requestFullScreen) {
      player.requestFullScreen()
    }
  }
}
function toggleFullscreenControls() {
  if (document.webkitFullscreenElement !== null) {
    fullscreen.textContent = 'X';
  } else {
    fullscreen.textContent = '▱';
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

document.addEventListener('fullscreenchange', toggleFullscreenControls)
document.addEventListener('webkitfullscreenchange', toggleFullscreenControls)
document.addEventListener('mozfullscreenchange', toggleFullscreenControls)

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mousup', () => mouseDown = false);

fullscreen.addEventListener('click', toggleFullscreen)
