var pumpkin_data = './images/pumpkin.gif'
var hatghost_data = './images/hatghost.gif'
var trickortreat_data = './images/trickortreat.gif'
var littleboy_data = './images/littleboy.gif'
var zombie_data = './images/zombie.gif'

var halloween_background = document.createElement('div');

var pumpkin = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = pumpkin_data
  img.style.width = '400px'
  img.style.height = '400px'
  img.style.transition = '20s all'
  img.style.position = 'fixed'
  img.style.left = '-400px'
  img.style.bottom = '-65px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 400px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 21300)
}

var pumpkin_trigger = function (data) {
  pumpkin()
};

var hatghost = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = hatghost_data
  img.style.width = '200px'
  img.style.height = '240px'
  img.style.transition = '20s all'
  img.style.position = 'fixed'
  img.style.left = '-200px'
  img.style.top = '60px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 200px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 20300)
}

var hatghost_trigger = function (data) {
  hatghost()
};

var trickortreat = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = trickortreat_data
  img.style.width = '340px'
  img.style.height = '300px'
  img.style.transition = '15s all'
  img.style.position = 'fixed'
  img.style.left = '-350px'
  img.style.top = '160px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 350px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 15300)
}

var trickortreat_trigger = function (data) {
  trickortreat()
};

var littleboy = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = littleboy_data
  img.style.width = '300px'
  img.style.height = '480px'
  img.style.transition = '10s all'
  img.style.position = 'fixed'
  img.style.right = '-300px'
  img.style.bottom = '-60px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.right = 'calc(100% + 300px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 10300)
}

var littleboy_trigger = function (data) {
  littleboy()
};

var zombie = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = zombie_data
  img.style.width = '420px'
  img.style.height = '400px'
  img.style.transition = '25s all'
  img.style.position = 'fixed'
  img.style.right = '-400px'
  img.style.bottom = '-130px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.right = 'calc(100% + 400px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 25300)
}

var zombie_trigger = function (data) {
  zombie()
};

try {
  // 先去偵測瀏覽器支援與否，有支援就 new
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  // console.log(recognition);
} catch (e) {
  console.error(e);
  document.getElementsByClassName('no-browser-support')[0].style.display = 'block';    
}

recognition.continuous = true;

recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  // 似乎是 mobile 的 bug，所有內容都會被重複印出兩次
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  if (!mobileRepeatBug) {
    console.log(transcript)
    if (transcript.toLowerCase().includes('halloween')) {
      var sound = new Audio("./images/halloween.mp3");
      sound.addEventListener("canplaythrough", function () {
        halloween_background.style.width = "100%";
        halloween_background.style.height = "100%";
        halloween_background.style.left = 0;
        halloween_background.style.top = 0;
        halloween_background.style.position = "fixed";
        halloween_background.style.zIndex = 9999;
        // halloween_background.style.background = '#FF7619';
        halloween_background.style.backgroundImage = "url('./images/background.png')";
        halloween_background.style.backgroundRepeat = "no-repeat";
        halloween_background.style.backgroundSize = "cover";
        halloween_background.style.backgroundPosition = "center";
        halloween_background.style.opacity = .4;
        document.body.appendChild(halloween_background);
        // play halloween music ~
        sound.play();
        setTimeout(function (){
          // stop the music after 12 secs
          sound.pause();
          // remove halloween_background image after 12 secs
          halloween_background.parentNode.removeChild(halloween_background);
        }, 12000); 
      }, false);

      hatghost_trigger(hatghost_data)
      pumpkin_trigger(pumpkin_data)
      trickortreat_trigger(trickortreat_data)
      littleboy_trigger(littleboy_data)
      zombie_trigger(zombie_data)
    }
  }
};

recognition.onstart = function () {
  document.getElementsByClassName('info-tips')[0].textContent = "#1 Voice recognition activated. Try speaking into the microphone please.";
  console.log('#1 Voice recognition activated. Try speaking into the microphone please.');
}

recognition.onspeechend = function () {
  document.getElementsByClassName('info-tips')[0].textContent = "#2 You were quiet for a while so voice recognition turned itself off.";
  console.log('#2 You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function (event) {
  if (event.error == 'no-speech') {
    document.getElementsByClassName('info-tips')[0].textContent = "#3 No speech was detected. Try again please.";
    console.log('#3 No speech was detected. Try again please.');
  };
}

recognition.start();