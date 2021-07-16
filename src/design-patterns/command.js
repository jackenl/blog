/**
 * 命令模式
 */

// 接收者类
class Receiver {
  execute() {
    console.log('接收者执行请求')
  }
}

// 命令者
class Command {  
  constructor(receiver) {
      this.receiver = receiver
  }
  execute () {    
      console.log('命令');
      this.receiver.execute()
  }
}
// 触发者
class Invoker {   
  constructor(command) {
      this.command = command
  }
  invoke() {   
      console.log('开始')
      this.command.execute()
  }
}

// 仓库
const warehouse = new Receiver();   
// 订单    
const order = new Command(warehouse);  
// 客户
const client = new Invoker(order);      
client.invoke()
