const $ = a => document.querySelector(a);
const videoPlayer = $('#video-player');
const bar = $('#video-hud__progress-bar');
const progressBar = $('#video-hud__progress-bar');
const currTime = $('#video-hud__curr-time');
const durationTime = $('#video-hud__duration');
const actionButton = $('#video-hud__action');
const muteButton = $('#video-hud__mute');
const volumeScale = $('#video-hud__volume');
const closeBtn = $('.close');
const mainBtn = $('.main-btn');
const modal = $('.modal-video');
const videoDiv = $('video');
const overlay = $('.overlay');
const series = $('.series');
const playBtn = $('.play');
const gamburger = $('.gamburger');
const header = $('.header');
const left = $('.left');
let playerType = '';

const _all = [
  'S01E01',
  'S01E02',
  'S01E03',
  'S01E04',
  'S01E05',
  'S01E06',
  'S01E07',
  'S01E08'
];

const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.arrow',
    },
    breakpoints: {
      560: {
        spaceBetween: 30,
        slidesPerView: 2
      }
    }
});

const isBtn = btn => Object.values(left.children).findIndex(child => child.className === btn);

const setBtn = (n = -2) => {
  nextBtn(n);
  prevBtn(n);
};

const closeModal = () => {
  modal.classList.add('hide');
  overlay.classList.add('hide');
  videoDiv.src = '';
};

function play() {
  playerType = 'play';

  setBtn();
  setBtn();

  modal.classList.remove('hide');
  overlay.classList.remove('hide');
  videoDiv.src = '/accets/video/witch.mp4';
  videoDiv.autoplay = 'autoplay';

  document.addEventListener('keydown', keyHandler);
}

function watch(series, n) {
  playerType = 'watch';
  
  setBtn(n);

  modal.classList.remove('hide');
  overlay.classList.remove('hide');
  videoDiv.src = `/accets/video/${series}.mp4`;
  videoDiv.autoplay = 'autoplay';

  document.addEventListener('keydown', keyHandler);
}

const currentSeries = e => {
  const t = e.target.closest('.s');
  if (t) {
    const target = t.className.split(' ').reverse()[0];
    const n = target.split('').reverse()[0] - 1;
    const numSer = _all.find(seria => seria.toLocaleLowerCase() === target);

    watch(numSer, n);
  }
};

function nextBtn(n) {
  const nextBtn = document.createElement('div');

  nextBtn.className = 'btn-next';
  nextBtn.onclick = () => nextSeries(1);

  if (n >= 0) {
    isBtn('btn-next') === -1 ? left.insertAdjacentElement('afterbegin', nextBtn) : null;
  } else if (left.firstChild.className === 'volume' || left.firstChild.className === 'btn-prev') {
    return;
  } else {
    left.removeChild(left.firstChild);
  }

}

function prevBtn(n) {
  const prevBtn = document.createElement('div');

  prevBtn.className = 'btn-prev';
  prevBtn.onclick = () => nextSeries(-1);

  if (n > 0) {
    isBtn('btn-prev') === -1 ? left.insertBefore(prevBtn, left.firstChild) : null;
  } else if (left.firstChild.className === 'volume'  || left.firstChild.className === 'btn-next') {
    return;
  } else {
    left.removeChild(left.firstChild);
  }

}

function nextSeries(n) {
  const len = _all.length;
  const s = /([a-z]\d{2}){2}/gi;
  const currentVideo = $('video').src.match(s)[0];
  const index = _all.findIndex(url => url === currentVideo) + n;
  const nextVideo = index < len && index > 0 ? index : 0;

  watch(_all[nextVideo], nextVideo);
}

function videoAct(e) { //Запускаем или ставим на паузу
  if(videoPlayer.paused) {
    videoPlayer.play();
  
    modal.addEventListener('mouseenter', hidePannel);
    modal.addEventListener('mouseleave', hidePannel);
    
    actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');
  } else {
    videoPlayer.pause();
  
    modal.removeEventListener('mouseenter', hidePannel);
    modal.removeEventListener('mouseleave', hidePannel);
  
    actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');
  }

  if(durationTime.textContent.trim() == '00:00') {
    durationTime.innerHTML = videoTime(videoPlayer.duration);
  } 

}

function videoTime(time) { //Рассчитываем время в секундах и минутах
  time = Math.floor(time);
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  let minutesVal = minutes;
  let secondsVal = seconds;
  
  if(minutes < 10) minutesVal = '0' + minutes;
  
  if(seconds < 10) secondsVal = '0' + seconds;
  
  return minutesVal + ':' + secondsVal; 
}
  
function videoProgress() { //Отображаем время воспроизведения
  const ungress = videoPlayer.duration - videoPlayer.currentTime;

  progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100));

  if (videoPlayer.currentTime > 0) progressBar.value = progress;

  currTime.innerHTML = videoTime(videoPlayer.currentTime);

  durationTime.innerHTML = videoTime(ungress);

  if (playerType = 'watch' && ungress === 0) nextSeries(1);

}
  
function videoChangeTime(e) { //Перематываем
  
  var mouseX = Math.floor(e.pageX - (progressBar.offsetLeft + modal.offsetLeft));

  var progress = mouseX / (progressBar.offsetWidth / 100);

  videoPlayer.currentTime = videoPlayer.duration * (progress / 100);

}

function videoChangeVolume(vol) { //Меняем громкость
  volumeScale.valueAsNumber += vol;
  const volume = volumeScale.value / 100;

  videoPlayer.volume = volume;
  
  if(videoPlayer.volume == 0) {
  
    muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_true');
  
  } else {
  
    muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_false');
  
  }
  
}

function keyHandler(e) {
  e.preventDefault();

  switch(e.code) {
    case "ArrowLeft":
      videoPlayer.currentTime -= 10;
      break;
    case "ArrowRight":
      videoPlayer.currentTime += 10;
      break;
    case "ArrowUp":
      videoChangeVolume(10);
      break;
    case "ArrowDown":
      videoChangeVolume(-10);
      break;
    default:
      break;
  }
}
  
function videoMute() { //Убираем звук
  
  if(videoPlayer.volume == 0) {
    videoPlayer.volume = volumeScale.value / 100;
    muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_false');
  } else {
    videoPlayer.volume = 0;
    muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_true');
  }
  
}

function fullScreen() {
 
  if (document.fullscreenElement) {
    document.exitFullscreen()
    .then()
    .catch((err) => console.error(err))
  } else {
    if(modal.requestFullscreen) {
      modal.requestFullscreen();
    } else if(modal.webkitrequestFullscreen) {
      modal.webkitRequestFullscreen();
    } else if(modal.mozRequestFullscreen) {
      modal.mozRequestFullScreen();
    }
  }
}

function hidePannel() {
  $('.video-hud').classList.toggle('hide');
  $('.video-hud__action').classList.toggle('hide');
}

//Запуск, пауза
playBtn.addEventListener('click', play);
mainBtn.addEventListener('click', play);
series.addEventListener('click', currentSeries);
actionButton.addEventListener('click',videoAct);
videoPlayer.addEventListener('click', videoAct);

// Остановка
closeBtn.addEventListener('click', closeModal);

// Отображение времени
videoPlayer.addEventListener('timeupdate',videoProgress);

//Перемотка
progressBar.addEventListener('click',videoChangeTime);

// Режим без звука
muteButton.addEventListener('click',videoMute);

// Изменение громкости
volumeScale.addEventListener('change',videoChangeVolume);

// полный экран
$('.full').addEventListener('click', fullScreen);

// Мобильное меню
gamburger.addEventListener('click', e => {
  e.target.closest('.gamburger').classList.toggle('active');
  header.classList.toggle('header-active');
});