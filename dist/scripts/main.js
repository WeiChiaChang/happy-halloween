var pumpkin_data="https://weichiachang.github.io/happy-halloween/images/pumpkin.gif",hatghost_data="https://weichiachang.github.io/happy-halloween/images/hatghost.gif",trickortreat_data="https://weichiachang.github.io/happy-halloween/images/trickortreat.gif",littleboy_data="https://weichiachang.github.io/happy-halloween/images/littleboy.gif",zombie_data="https://weichiachang.github.io/happy-halloween/images/zombie.gif",pumpkin=function(){var t=(document.createElement("div"),new Image);t.src=pumpkin_data,t.style.width="400px",t.style.height="400px",t.style.transition="20s all",t.style.position="fixed",t.style.left="-400px",t.style.bottom="-65px",t.style.zIndex=99999,document.body.appendChild(t),window.setTimeout(function(){t.style.left="calc(100% + 400px)"},50),window.setTimeout(function(){t.parentNode.removeChild(t)},21300)},pumpkin_trigger=function(t){pumpkin()},hatghost=function(){var t=(document.createElement("div"),new Image);t.src=hatghost_data,t.style.width="200px",t.style.height="240px",t.style.transition="20s all",t.style.position="fixed",t.style.left="-200px",t.style.top="60px",t.style.zIndex=99999,document.body.appendChild(t),window.setTimeout(function(){t.style.left="calc(100% + 200px)"},50),window.setTimeout(function(){t.parentNode.removeChild(t)},20300)},hatghost_trigger=function(t){hatghost()},trickortreat=function(){var t=(document.createElement("div"),new Image);t.src=trickortreat_data,t.style.width="340px",t.style.height="300px",t.style.transition="15s all",t.style.position="fixed",t.style.left="-350px",t.style.top="160px",t.style.zIndex=99999,document.body.appendChild(t),window.setTimeout(function(){t.style.left="calc(100% + 350px)"},50),window.setTimeout(function(){t.parentNode.removeChild(t)},15300)},trickortreat_trigger=function(t){trickortreat()},littleboy=function(){var t=(document.createElement("div"),new Image);t.src=littleboy_data,t.style.width="300px",t.style.height="480px",t.style.transition="10s all",t.style.position="fixed",t.style.right="-300px",t.style.bottom="-60px",t.style.zIndex=99999,document.body.appendChild(t),window.setTimeout(function(){t.style.right="calc(100% + 300px)"},50),window.setTimeout(function(){t.parentNode.removeChild(t)},10300)},littleboy_trigger=function(t){littleboy()},zombie=function(){var t=(document.createElement("div"),new Image);t.src=zombie_data,t.style.width="420px",t.style.height="400px",t.style.transition="25s all",t.style.position="fixed",t.style.right="-400px",t.style.bottom="-130px",t.style.zIndex=99999,document.body.appendChild(t),window.setTimeout(function(){t.style.right="calc(100% + 400px)"},50),window.setTimeout(function(){t.parentNode.removeChild(t)},25300)},zombie_trigger=function(t){zombie()};try{var SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition,recognition=new SpeechRecognition}catch(t){console.error(t),$(".no-browser-support").show()}recognition.continuous=!0,recognition.onresult=function(t){var e=t.resultIndex,i=t.results[e][0].transcript;if((1!=e||i!=t.results[0][0].transcript)&&(console.log(i),i.toLowerCase().includes("halloween"))){var o=new Audio("https://weichiachang.github.io/happy-halloween/images/halloween.mp3");o.addEventListener("canplaythrough",function(){o.play(),setTimeout(function(){o.pause()},12e3)},!1),hatghost_trigger(hatghost_data),pumpkin_trigger(pumpkin_data),trickortreat_trigger(trickortreat_data),littleboy_trigger(littleboy_data),zombie_trigger(zombie_data)}},recognition.onstart=function(){$(".info-tips").text("#1 Voice recognition activated. Try speaking into the microphone please."),console.log("#1 Voice recognition activated. Try speaking into the microphone please.")},recognition.onspeechend=function(){$(".info-tips").text("#2 You were quiet for a while so voice recognition turned itself off."),console.log("#2 You were quiet for a while so voice recognition turned itself off.")},recognition.onerror=function(t){"no-speech"==t.error&&($(".info-tips").text("#3 No speech was detected. Try again please."),console.log("#3 No speech was detected. Try again please."))},recognition.start();
//# sourceMappingURL=main.js.map