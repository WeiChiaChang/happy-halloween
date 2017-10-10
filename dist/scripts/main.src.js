try {
  // 先去偵測瀏覽器支援與否，有支援就 new 出來
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  console.log(recognition);
} catch (e) {
  console.error(e);
  $('.no-browser-support').show();
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
      hatghost_trigger(hatghost_data)
      pumpkin_trigger(pumpkin_data)
      trickortreat_trigger(trickortreat_data)
      littleboy_trigger(littleboy_data)
      zombie_trigger(zombie_data)
    }
  }
};

recognition.onstart = function () {
  console.log('#1 Voice recognition activated. Try speaking into the microphone please.');
}

recognition.onspeechend = function () {
  console.log('#2 You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function (event) {
  if (event.error == 'no-speech') {
    console.log('#3 No speech was detected. Try again.');
  };
}

// start() when loading already～
recognition.start();

var pumpkin = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = pumpkin_data
  img.style.width = '500px'
  img.style.height = '500px'
  img.style.transition = '20s all'
  img.style.position = 'fixed'
  img.style.left = '-600px'
  img.style.bottom = '-60px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 500px)'
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
  img.style.width = '300px'
  img.style.height = '340px'
  img.style.transition = '24s all'
  img.style.position = 'fixed'
  img.style.left = '-300px'
  img.style.top = '100px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 300px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 24300)
}

var hatghost_trigger = function (data) {
  hatghost()
};

var trickortreat = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = trickortreat_data
  img.style.width = '440px'
  img.style.height = '400px'
  img.style.transition = '13s all'
  img.style.position = 'fixed'
  img.style.left = '-400px'
  img.style.top = '200px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 400px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 21300)
}

var trickortreat_trigger = function (data) {
  trickortreat()
};

var littleboy = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = littleboy_data
  img.style.width = '300px'
  img.style.height = '400px'
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

var pumpkin_data = 'https://weichiachang.github.io/happy-halloween/images/pumpkin.gif'
var hatghost_data = 'https://weichiachang.github.io/happy-halloween/images/hatghost.gif'
var trickortreat_data = 'https://weichiachang.github.io/happy-halloween/images/trickortreat.gif'
var littleboy_data = 'https://weichiachang.github.io/happy-halloween/images/littleboy.gif'
var zombie_data = 'https://weichiachang.github.io/happy-halloween/images/zombie.gif'


