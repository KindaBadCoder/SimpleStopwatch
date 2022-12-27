class Timer {
  constructor(accuracy = 100, onStartChange, onPauseChange, onTimeChange) {
    // time
    this.timeBeforeLastStart = null;
    this.lastStart = null;
    this.interval = null;

    // state
    this.paused = null;
    this.started = false;

    // rate of time update
    this.accuracy = accuracy;

    // callbacks
    this.onStartChange = onStartChange;
    this.onPauseChange = onPauseChange;
    this.onTimeChange = onTimeChange;
  }
  setStart(newStart) {
    this.started = newStart;
    this.onStartChange(newStart);
  }
  setPause(newPause) {
    this.paused = newPause;
    this.onPauseChange(newPause);
  }
  start() {
    this.setStart(true);
    this.timeBeforeLastStart = 0;
    this.unpause();
  }
  reset() {
    this.setStart(false);
    this.timeBeforeLastStart = null;
    this.lastStart = null;
    this.setPause(null);
    clearInterval(this.interval);
    this.onTimeChange(this.getTimeString());
  }
  unpause() {
    this.setPause(false);
    this.lastStart = new Date();
    this.startInterval();
  }
  pause() {
    this.setPause(true);
    this.timeBeforeLastStart += new Date() - this.lastStart;
    clearInterval(this.interval);
  }

  startInterval() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.onTimeChange(this.getTimeString());
    });
  }

  getTimeString() {
    if (!this.started) {
      return '00:00';
    }
    let milisecond = this.timeBeforeLastStart + (new Date() - this.lastStart);
    let text = new Date(milisecond).toISOString().slice(11, 11 + 8);
    if (text.startsWith('00:')) {
      text = text.slice(3);
    }
    return text;
  }
}

let timer = new Timer(
  100,
  (started) => {
    document.querySelector('#beforeStart').style.display = started
      ? 'none'
      : '';
    document.querySelector('#afterStart').style.display = started ? '' : 'none';
  },
  (paused) => {
    document.querySelector('#pause').textContent = paused ? 'Resume' : 'Pause';
  },
  (time) => {
    document.querySelector('#clock').textContent = time;
  }
);

document.querySelector('#start').addEventListener('click', () => {
  timer.start();
});
document.querySelector('#pause').addEventListener('click', () => {
  if (timer.paused) {
    timer.unpause();
  } else {
    timer.pause();
  }
});
document.querySelector('#reset').addEventListener('click', () => {
  timer.reset();
});
