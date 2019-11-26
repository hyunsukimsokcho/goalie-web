import messages_ko from '../../translations/ko.json';
import messages_en from '../../translations/en.json';

import './Toast.scss';
import { getBrowserLanguageCode } from '../../utils';


const Toast = () => {
  const FADE_TIME = 200;
  // const lang = getBrowserLanguageCode();
  const lang = 'en';
  const messages = {
    ko: messages_ko,
    en: messages_en,
  };

  let lastShowTime = 0;
  let lastText = '';
  let lastInvokeTime = 0;

  let mainTimer = {
    id: '',
  };
  let subTimer = {
    id: '',
  };

  let gloBody = null;
  let gloToastContainer = null;
  let gloToast = null;

  function Toast() {
    let toast = document.createElement('div');
    toast.classList.add('toast', 'fadeout');
    return toast;
  }

  function renderToast() {
    gloToast = gloToastContainer.appendChild(Toast());
  }

  function setText(text) {
    if (lastText !== text) {
      gloToast.innerText = messages[lang][text] || 'Loading..';
      lastText = text;
    }
  }

  function setElement() {
    let body = document.body;
    let toastContainer = document.querySelector(
      'body > .toast-container',
    );
    let toast = document.querySelector(
      'body > .toast-container > .toast',
    );

    if (body) {
      if (!toastContainer) {
        let container = document.createElement('div');
        container.classList.add('toast-container', 'show');
        toastContainer = body.appendChild(container);
      }
    }

    gloBody = body;
    gloToastContainer = toastContainer;
    gloToast = toast;
  }

  function fadeinToast(callback, time = FADE_TIME) {
    // To send to the queue.
    setTimeout(() => {
      gloToastContainer.classList.remove('hide');
      gloToastContainer.classList.add('show');
      setTimeout(() => {
        gloToast.classList.remove('fadeout');
        gloToast.classList.add('fadein');
      }, 20);
    }, 0);

    // The callback function executed after fadein.
    if (callback) subTimer.id = startTimer(callback, time);
  }

  function fadeoutToast(callback, time = FADE_TIME) {
    // To send to the queue.
    setTimeout(() => {
      gloToast.classList.remove('fadein');
      gloToast.classList.add('fadeout');
    }, 0);
    // The callback function executed after fadeout.
    if (callback)
      subTimer.id = startTimer(() => {
        gloToastContainer.classList.remove('show');
        gloToastContainer.classList.add('hide');
        callback();
      }, time);
  }

  function startTimer(invokeFunc, time) {
    return setTimeout(invokeFunc, time).toString();
  }

  function clearTimer(timer) {
    // setTimeout returns a natural number.
    if (timer.id) {
      clearTimeout(timer.id);
    }
  }

  function stop(showTime, now, callback) {
    // time since last invoke time
    const TSLIT = now - lastInvokeTime;

    clearTimer(mainTimer);
    clearTimer(subTimer);

    if (TSLIT < FADE_TIME) {
      fadeoutToast(callback, TSLIT);
    } else if (FADE_TIME <= TSLIT && TSLIT <= FADE_TIME + lastShowTime) {
      fadeoutToast(callback, FADE_TIME);
    } else if (
      FADE_TIME + lastShowTime < TSLIT &&
      TSLIT < FADE_TIME + lastShowTime + FADE_TIME
    ) {
      fadeoutToast(callback, FADE_TIME + lastShowTime + FADE_TIME - TSLIT);
    } else {
      callback();
    }
  }

  function run(text, showTime, now) {
    lastShowTime = showTime;
    lastInvokeTime = now;
    setText(text);
    fadeinToast();
    // The time to fadein and fadeout is not contain in show time.
    mainTimer.id = startTimer(() => {
      fadeoutToast(() => {
        mainTimer.id = '';
      });
    }, FADE_TIME + showTime);
  }

  function showToast(text, showTime) {
    const now = Date.now();

    setElement();

    if (!gloToast) renderToast();

    if (!mainTimer.id) {
      run(text, showTime, now);
    } else {
      stop(showTime, now, () => {
        run(text, showTime, now);
      });
    }
  }

  return showToast;
};

export default Toast();
