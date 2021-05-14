function offsetTimer(countUp) {
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

    countUp.timeout = setTimeout(() => {
      instance();
    }, speed - diff); // 超时补偿
  }

  countUp.timeout = setTimeout(() => {
    instance();
  }, speed);
}