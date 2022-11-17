const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    secondsLeft = seconds;
    
    if (timerEl.dataset.timer){
      clearTimeout(timerEl.dataset.timer);
    }

    function tick() {

        let ss = (secondsLeft % 60).toString();
        let mm = ((Math.round((secondsLeft - (+ss)) / 60)) % 60).toString();
        let hh = Math.floor(secondsLeft/3600).toString();

        if (ss.length<2) {ss = '0'+ss;};
        if (mm.length<2) {mm = '0'+mm;};
        if (hh.length<2) {hh = '0'+hh;};

        timerEl.innerHTML = `${hh}:${mm}:${ss}`;

        if (secondsLeft <= 0){
                timerEl.style.boxShadow = '0px 0px 10px 5px red';
                timerEl.style.backgroundColor = 'red';
                timerEl.style.color = 'white';
                timerEl.dataset.timer = null;
        } else if (secondsLeft > 0) {
          secondsLeft--;
          timerEl.dataset.timer = setTimeout(tick, 1000);
        }
      }
      tick()
    }
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  let reg = new RegExp('^[0-9]*$');
  if (inputEl.value.length > 0 && reg.test(inputEl.value)) {
      inputEl.setAttribute("is-valid", "1");
      inputEl.style.border = "2px solid green"
      inputEl.style.boxShadow = '0px 0px 10px green';
  } else {
      inputEl.setAttribute("is-valid", "0");
      inputEl.style.border = "2px solid red";
      inputEl.style.boxShadow = '0px 0px 10px red';
  }
});

buttonEl.addEventListener('click', () => {
  if (+inputEl.getAttribute("is-valid")){
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
    inputEl.style.border = null;
    inputEl.style.boxShadow = null;
    timerEl.style.boxShadow = null;
    timerEl.style.backgroundColor = null;
    timerEl.style.color = null;
  }
});
