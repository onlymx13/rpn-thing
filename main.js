var stack; //TODO: make stack local

function runCode() {
  var commandNum = 0;
  code = document.getElementById('code').value.split('');
  stack = document.getElementById('input').value.split('\n'); // Input is just the original stack
  while (true) {
    document.getElementById('stack').innerHTML = stack;
    if (commandNum >= code.length) break;
    command = code[commandNum++];
    execute(command);
  }
}

function execute(command) {
  if (Number(command) || command === '0') {
    return stack.push(Number(command));
  }
  else if (command === '+') {
    return stack.push(stack.pop() + stack.pop());
  }
  else if (command === '-') {
    return stack.push(-(stack.pop() - stack.pop()));
  }
  else if (command === '*') {
    return stack.push(stack.pop() * stack.pop());
  }
  else if (command === '/') {
    return stack.push(1 / (stack.pop() / stack.pop()));
  }
  else if (command === '^') {
    var a = stack.pop();
    return stack.push(Math.pow(stack.pop(),a));
  }
  else if (command === '=') {
     return stack.push(Number(stack.pop() === stack.pop()));
  }
  else if (command === '<') {
     return stack.push(Number(stack.pop() > stack.pop()));
  }
  else if (command === '>') {
     return stack.push(Number(stack.pop() < stack.pop()));
  }
  else {
    throw new TypeError("Command not defined!!!!!!!!!!!!!!!!!!!");
  }
}
