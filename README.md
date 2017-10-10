## happy-halloween
🗣 Say "happy halloween" to your browser 🎃 !

> Still trying to figure out about how to solve long first loading time, any advice, pull request or issues will be welcome, thanks !

<p align="center">
  <a target="_blank" href="https://github.com/WeiChiaChang/happy-halloween">
    <img alt="halloween-demo" src="https://i.imgur.com/HID7mRV.gif">
  </a>
</p>

## Caveat 
At this stage, you have to use Google Chrome (version >  60 at least) for browsing happy-halloween since Web Speech API still an [experimental technology](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and other browsers still under implementation so far. You can check [caniuse](https://caniuse.com/#feat=speech-recognition) for more details.

## Usage
Choose to <b>Allow</b> the site's use of your microphone :

<p align="center">
  <a target="_blank" href="https://github.com/WeiChiaChang/happy-halloween">
    <img alt="open-your-microphone" src="https://i.imgur.com/tfGf5cH.png">
  </a>
</p>

You will see the red light if you allow your microphone :

<p align="center">
  <a target="_blank" href="https://github.com/WeiChiaChang/happy-halloween">
    <img alt="see-red-light" src="https://i.imgur.com/iE55p9T.png">
  </a>
</p>

That's all, just say "happy halloween" to your browser ! ![turtle](http://i.imgur.com/879dfXS.gif)

## Demo
[Just have fun !](https://weichiachang.github.io/happy-halloween/dist/)

## Installation
First if all, install [pingy](https://pin.gy/cli/) as default front-end build tool.

```shell
$ npm install @pingy/cli -g
```

Then make sure install all packages

```shell
$ npm install
```

## Developing

#### Setting up Dev
```shell
$ pingy dev
```

#### Deploying / Publishing
```shell
$ pingy export
```

## CDN & NPM
You can use CDN directly
```javascript
https://rawgit.com/WeiChiaChang/Easter-egg/master/happy-halloween.js
```

The package is also available via [NPM](https://www.npmjs.com/package/happy-halloween).

```shell
$ npm install happy-halloween
```

## Source
All of the Gifs were derived from [GIPHY](https://giphy.com/).

Original source of background image comes from [here](http://tianyihengfeng.com/happy-halloween-email/).

Audio in the Demo (sourced from [BenSound](https://www.bensound.com/)) is licenced under [Creative Commons](https://www.bensound.com/licensing).

## Related
- [Converting from Speech to Text with JavaScript](https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript)
- [easter-egg-collection](https://github.com/WeiChiaChang/easter-egg-collection)

## License
MIT © [WeiChiaChang](https://github.com/WeiChiaChang/)
