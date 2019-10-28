var stack; //TODO: make stack local

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function runCode() {
  var commandNum = 0;
  code = document.getElementById('code').value.split('');
  stack = document.getElementById('input').value.split('\n').filter(n =>  n != '').map(x => Number(x)); // Input is just the original stack
  while (true) {
    document.getElementById('stack').innerHTML = stack;
    if (commandNum >= code.length) break;
    command = code[commandNum++];
    commandNum = execute(command, commandNum);
  }
}

function execute(command, num) {
  if (Number(command) || command === '0') {
    stack.push(Number(command));
  }
  else if (command === '+') {
    stack.push(stack.pop() + stack.pop());
  }
  else if (command === '-') {
    stack.push(-(stack.pop() - stack.pop()));
  }
  else if (command === '*') {
    stack.push(stack.pop() * stack.pop());
  }
  else if (command === '/') {
    stack.push(1 / (stack.pop() / stack.pop()));
  }
  else if (command === '^') {
    var a = stack.pop();
    stack.push(Math.pow(stack.pop(),a));
  }
  else if (command === '=') {
     stack.push(Number(stack.pop() === stack.pop()));
  }
  else if (command === '<') {
     stack.push(Number(stack.pop() > stack.pop()));
  }
  else if (command === '>') {
     stack.push(Number(stack.pop() < stack.pop()));
  }
  else if (command === '%') {
    var a = stack.pop();
    stack.push(stack.pop() % a);
  }
  else if (command === '!') {
    stack.push(factorial(stack.pop()));
  }
  else if (command === '"') {
    var a = stack.pop();
    stack.push(a);
    stack.push(a);
  }
  else if (command === '~') {
    a = stack.pop();
    b = stack.pop();
    stack.push(a);
    stack.push(b);
  }
  else if (command === '?') {
    if (!stack.pop()) {
      num++;
    }
  }
  else {
    throw new TypeError("Command not defined!!!!!!!!!!!!!!!!!!!");
  }
  return num;
}
