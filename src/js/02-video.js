import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframeRef = document.getElementById('vimeo-player');
const player = new Vimeo(iframeRef);

player.on('loaded', onPlayerLoaded);
player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerLoaded() {
  if (localStorage.getItem(STORAGE_KEY)) {
    player
      .setCurrentTime(localStorage.getItem(STORAGE_KEY))
      .catch(function (error) {
        console.log(error.name + ': ' + error.message);
      });
  }

  player.off('loaded');
}

function onPlayerTimeUpdate(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}
