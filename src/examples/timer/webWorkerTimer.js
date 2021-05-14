function createWorker (fn, options) {
  const blob = new Blob(['(' + fn.toString() + ')()']);
  const url = URL.createObjectURL(blob);
  if (options) {
    return new Worker(url, options);
  }
  return new Worker(url);
}

function webWorkerTimer(countUp) {
  let isStart = false;
  const speed = 50;
  
  const worker = createWorker(() => {
    onmessage = function (e) {
      isStart = true;
      const start = +new Date();
      while (true) {
        const now = +new Date();
        console.log(now);
        if (now - start >= e.data) {
          countUp.real = now - start;
          postMessage(1);
          return;
        }
      }
    }
  });
  
  worker.onmessage = (e) => {
    cb();
    if (isStart) {
      worker.postMessage(speed);
    }
  }
  worker.postMessage(speed);
  countUp.worker = worker;
}

function loopTimer(start, time) {
  start = start || +new Date();
  while (loop) {
    const now = +new Date();
    if (now - start >= time) {
      return now - start;
    }
  }
}