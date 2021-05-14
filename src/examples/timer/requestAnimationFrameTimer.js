let isClear = false;

function setTimeout2(cb, delay) {
  const start = +new Date();
  step();

  function step() {
    const now = +new Date();
    if (now - start >= delay) {
      cb();
      return;
    }
    if (!isClear) {
      requestAnimationFrame(step);
    }
  }
}

function clearTimeout2() {
  isClear = true;
  setTimeout(() => {
    isClear = false;
  }, 100);
}

function requestAnimationFrameTimer(countUp) {
  let speed = 50, counter = 1;
  start = new Date().getTime();

  function instance() {
    let ideal = counter * speed;
    let real = (new Date().getTime() - start);

    counter++;
    countUp.ideal = ideal;
    countUp.real = real;

    let diff = real - ideal;
    countUp.diff = diff;

    countUp.timeout = setTimeout2(() => {
      instance();
    }, speed);
  }

  countUp.timeout = setTimeout2(() => {
    instance();
  }, speed);
}
