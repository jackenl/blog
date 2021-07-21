// 实现一个带并发限制的异步调度器Scheduler
// 保证同时运行的任务最多有两个

class Scheduler {
  constructor() {
    this.count = 2;
    this.tasks = [];
    this.current = 0; // 当前完成任务数量
  }
  add(promiseCreator) {
    return new Promise((resolve) => {
      this.tasks.push(() => promiseCreator().then(resolve));
      this.runTask();
    });
  }
  runTask() {
    if (this.current >= this.count) return;
    let currentTask = this.tasks.shift();
    if (currentTask) {
      this.current++;
      currentTask().then(() => {
        this.current -= 1;
        this.runTask();
      });
    }
  }
}
const timeout = (timer) => new Promise((resolve) => setTimeout(resolve, timer));
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order);
    });
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4
