/**
 * Web Worker 构建器
 * @param {function} fn 
 * @param {object} options 
 * @returns 
 */
function createWorker (fn, options) {
  const blob = new Blob(['(' + fn.toString() + ')()']);
  const url = URL.createObjectURL(blob);
  if (options) {
    return new Worker(url, options);
  }
  return new Worker(url);
}

/**
 * Web Worker 计时器
 * @param {function} callback 
 */
function webWorkerTimer(callback) {
  let isStart = false;
  const speed = 50;
  const start = +new Date();
  const count = {
    ideal: 0,
    real: 0,
    diff: 0
  };
  
  const worker = createWorker(() => {
    onmessage = function (e) {
      const date = +new Date();
      while (true) {
        const now = +new Date();
        if (now - date >= e.data) {
          postMessage(1);
          return;
        }
      }
    }
  });
  count.worker = worker;
  
  worker.onmessage = (e) => {
    const now = +new Date();
    count.ideal = now - start;
    count.real += speed;
    count.diff = count.ideal - count.real;
    callback(count);

    if (isStart) {
      worker.postMessage(speed);
    }
  }

  isStart = true;
  worker.postMessage(speed);
}
