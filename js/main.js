const $ = a => document.querySelector(a); 

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

function play() {
  $('.modal-video').classList.remove('hide');
  $('.overlay').classList.remove('hide');
  $('video').src = '/img/witch.mp4';
  $('video').autoplay = 'autoplay';
}

$('.gamburger').addEventListener('click', e => {
  e.target.closest('.gamburger').classList.toggle('active');
  $('.header').classList.toggle('header-active');
});

$('.play').addEventListener('click', play);
$('.main-btn').addEventListener('click', play);

$('.close').addEventListener('click', () => {
  $('.modal-video').classList.add('hide');
  $('.overlay').classList.add('hide');
  $('video').src = '';
});

const  videoPlayer = $('#video-player');
const bar = $('#video-hud__progress-bar');
//Время

const progressBar = $('#video-hud__progress-bar');

const currTime = $('#video-hud__curr-time');

const durationTime = $('#video-hud__duration');

//Кнопки

const actionButton = $('#video-hud__action');

const muteButton = $('#video-hud__mute');

const volumeScale = $('#video-hud__volume');

function videoAct(e) { //Запускаем или ставим на паузу

if(videoPlayer.paused) {
  
  videoPlayer.play();

  $('.modal-video').addEventListener('mouseenter', hidePannel);
  $('.modal-video').addEventListener('mouseleave', hidePannel);


actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');

} else {

videoPlayer.pause();

$('.modal-video').removeEventListener('mouseenter', hidePannel);
$('.modal-video').removeEventListener('mouseleave', hidePannel);

actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');

}

if(durationTime.textContent.trim() == '00:00') {

durationTime.innerHTML = videoTime(videoPlayer.duration); //Об этой функции чуть ниже

} 

}

//Запуск, пауза

actionButton.addEventListener('click',videoAct);

videoPlayer.addEventListener('click', videoAct);

function videoTime(time) { //Рассчитываем время в секундах и минутах

  time = Math.floor(time);
  
  var minutes = Math.floor(time / 60);
  
  var seconds = Math.floor(time - minutes * 60);
  
  var minutesVal = minutes;
  
  var secondsVal = seconds;
  
  if(minutes < 10) {
  
  minutesVal = '0' + minutes;
  
  }
  
  if(seconds < 10) {
  
  secondsVal = '0' + seconds;
  
  }
  
  return minutesVal + ':' + secondsVal;
  
  }
  
  function videoProgress() { //Отображаем время воспроизведения
  
  progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100));
  
  progressBar.value = progress;

  const ungress = videoPlayer.duration - videoPlayer.currentTime;

  currTime.innerHTML = videoTime(videoPlayer.currentTime);
  
  durationTime.innerHTML = videoTime(ungress);
  
  }
  
  function videoChangeTime(e) { //Перематываем
    
    var mouseX = Math.floor(e.pageX - (progressBar.offsetLeft + $('.modal-video').offsetLeft));
  
  var progress = mouseX / (progressBar.offsetWidth / 100);
  
  videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
  
  }

  //Отображение времени

videoPlayer.addEventListener('timeupdate',videoProgress);

//Перемотка

progressBar.addEventListener('click',videoChangeTime);

function videoChangeVolume() { //Меняем громкость

  var volume = volumeScale.value / 100;
  
  videoPlayer.volume = volume;
  
  if(videoPlayer.volume == 0) {
  
  muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_true');
  
  } else {
  
  muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_false');
  
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
  //Звук

muteButton.addEventListener('click',videoMute);

volumeScale.addEventListener('change',videoChangeVolume);


// полный экран
$('.full').addEventListener('click', fullScreen);

function fullScreen() {
  const element = $('.modal-video');
  if (document.fullscreenElement) {
    document.exitFullscreen()
      .then()
      .catch((err) => console.error(err))
  } else {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.mozRequestFullscreen) {
      element.mozRequestFullScreen();
    };
  }
}

function hidePannel() {
  $('.video-hud').classList.toggle('hide');
  $('.video-hud__action').classList.toggle('hide');
}

