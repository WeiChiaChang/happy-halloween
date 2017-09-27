try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}

var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
// var notesList = $('ul#notes');
var noteContent = '';
// 看起來是關鍵
// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;
// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;
  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;
  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
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
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function () {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function (event) {
  if (event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}

recognition.start();

$('#pause-record-btn').on('click', function (e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});

function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

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