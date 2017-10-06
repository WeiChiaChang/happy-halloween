try {
  // 先去偵測瀏覽器支援與否，有支援就 new 
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  console.log("hello world: ");
  console.log(recognition);
} catch (e) {
  // 不支援就秀出 GG 畫面
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}

var noteTextarea = $('#note-textarea');
var noteContent = '';
// 看起來是關鍵
// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// true 的話會持續長達 15 秒～
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;
// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  console.log(event)
  var current = event.resultIndex;
  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;
  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // 似乎是 mobile 的 bug，所有內容都會被重複印出兩次＠＠
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  if (!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
    // 在這觸發
    console.log(transcript)
    if (transcript.toLowerCase().includes('halloween')) {
      trigger(data)
    }
  }
};

recognition.onstart = function () {
  console.log('#1 Voice recognition activated. Try speaking into the microphone.');
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

// That's where easter egg be triggered
var dog = function () {
  var shock = document.createElement('div')
  var img = new Image()
  img.src = data
  img.style.width = '1050px'
  img.style.height = '300px'
  img.style.transition = '7s all'
  img.style.position = 'fixed'
  img.style.left = '-1100px'
  img.style.bottom = '0px'
  img.style.zIndex = 99999

  document.body.appendChild(img)

  window.setTimeout(function () {
    img.style.left = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(function () {
    img.parentNode.removeChild(img)
  }, 7300)
}

var trigger = function (data) {
  dog()
};

var data = 'https://i.imgur.com/rJRRZw7.gif'