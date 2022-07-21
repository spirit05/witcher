const $ = a => document.querySelector(a);
const cartSlider = $('.swiper-wrapper');
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

const cards = [
  {
      cart: "cart s s01e01",
      count: "Серия #1",
      name: "Начало конца",
      bg: "background-image: url(../accets/img/cart/s1-s1.png);",
      img: "url(../accets/img/cart/s1-s1.png)"
  },
  {
      cart: "cart s s01e02",
      count: "Серия #2",
      name: "Четыре марки",
      bg: "background-image: url(../accets/img/cart/s1-s2.png);",
      img: "url(../accets/img/cart/s1-s2.png)"
  },
  {
      cart: "cart s s01e03",
      count: "Серия #3",
    name: "Предательская луна",
      bg: "background-image: url(../accets/img/cart/s1-s3.png);",
      img: "url(../accets/img/cart/s1-s3.png)"
  },
  {
      cart: "cart s s01e04",
      count: "Серия #4",
      name: "Банкеты, ублюдки и похороны",
      bg: "background-image: url(../accets/img/cart/s1-s4.png);",
      img: "url(../accets/img/cart/s1-s4.png)"
  },
  {
      cart: "cart s s01e05",
      count: "Серия #5",
      name: "Желания из бутылки",
      bg: "background-image: url(../accets/img/cart/s1-s5.png);",
      img: "url(../accets/img/cart/s1-s5.png)"
  },
  {
      cart: "cart s s01e06",
      count: "Серия #6",
      name: "Редкие виды",
      bg: "background-image: url(../accets/img/cart/s1-s6.png);",
      img: "url(../accets/img/cart/s1-s6.png)"
  },
  {
      cart: "cart s s01e07",
      count: "Серия #7",
      name: "Перед падением",
      bg: "background-image: url(../accets/img/cart/s1-s7.png);",
      img: "url(../accets/img/cart/s1-s7.png)"
  },
  {
      cart: "cart s s01e08",
      count: "Серия #8",
      name: "Нечто большее",
      bg: "background-image: url(../accets/img/cart/s1-s8.png);",
      img: "url(../accets/img/cart/s1-s8.png)"
  }
];

const _all = {
  S01E01: 'https://cloud.mail.ru/home/video/%D0%B2%D0%B5%D0%B4%D1%8C%D0%BC%D0%B0%D0%BA/1%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD/S01E01.mp4',
  S01E02: 'https://satsys.ucoz.ru/series/S01E02.mp4',
  S01E03: 'https://satsys.ucoz.ru/series/S01E03.mp4',
  S01E04: 'https://satsys.ucoz.ru/series/S01E04.mp4',
  S01E05: 'https://satsys.ucoz.ru/series/S01E05.mp4',
  S01E06: 'https://satsys.ucoz.ru/series/S01E06.mp4',
  S01E07: 'https://satsys.ucoz.ru/series/S01E07.mp4',
  S01E08: 'https://satsys.ucoz.ru/series/S01E08.mp4',
};

const slides = cards.reduce((html, seria) => {
  html += `
    <div class="swiper-slide">
      <div class="${seria.cart}" style="${seria.bg}">
          <span class="series-numb">${seria.count}</span>
          <span class="series-title">${seria.name}</span>
      </div>
    </div>
  `; 



  return html;
}, '');

cartSlider.insertAdjacentHTML('afterbegin', slides);

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
  if (document.querySelector('.frame')) {
    document.querySelector('.frame').remove();
  }
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
  // playerType = 'watch';
  
  // setBtn(n);

  let video = `<div class="frame">
  <iframe src="https://player-smotri.mail.ru/?viewMode=external&amp;brandsafety=1&amp;autoplay=0&amp;tags=1193&amp;manifestUrl=https%3A%2F%2Fcloclo51.cloud.mail.ru%2Fvideo%2F0p%2FL3ZpZGVvLyVEMCVCMiVEMCVCNSVEMCVCNCVEMSU4QyVEMCVCQyVEMCVCMCVEMCVCQS8xJTIwJUQxJTgxJUQwJUI1JUQwJUI3JUQwJUJFJUQwJUJEL1MwMUUwMS5tcDQ%3D.m3u8%3Fdouble_encode%3D1&amp;pictureUrl=https%3A%2F%2Fthumb.cloud.mail.ru%2Fthumb%2Fvxw0%2Fvideo%2F%25D0%25B2%25D0%25B5%25D0%25B4%25D1%258C%25D0%25BC%25D0%25B0%25D0%25BA%2F1%2520%25D1%2581%25D0%25B5%25D0%25B7%25D0%25BE%25D0%25BD%2FS01E01.mp4&amp;initLow=0" allowfullscreen="" allow="autoplay; fullscreen"></iframe></div>`

  modal.classList.remove('hide');
  overlay.classList.remove('hide');
  document.querySelector('.video-wrapper').classList.add('hide');

  modal.insertAdjacentHTML('beforeend', video);
  console.log('insert', video);
  console.log(modal);

  // videoDiv.autoplay = 'autoplay';

  // document.addEventListener('keydown', keyHandler);
}

const currentSeries = e => {
  const t = e.target.closest('.s');
  if (t) {
    const target = t.className.split(' ').reverse()[0];
    const n = target.split('').reverse()[0] - 1;
    const numSer = _all[Object.keys(_all).find(seria => seria.toLocaleLowerCase() === target)];
    
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
  const allVid = Object.keys(_all);
  const len = allVid.length;
  const s = /([a-z]\d{2}){2}/gi;
  const currentVideo = $('video').src.match(s)[0];
  const index = allVid.findIndex(url => url === currentVideo) + n;
  const nextVideo = index < len && index > 0 ? index : 0;

  watch(Object.values(_all)[nextVideo], nextVideo);
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