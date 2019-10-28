var stack; //TODO: make stack local

function runCode() {
  var commandNum = 0;
  stack = [];
  code = document.getElementById('code').value.split('');
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
    return stack.push(stack.pop() - stack.pop());
  }
  else if (command === '*') {
    return stack.push(stack.pop() * stack.pop());
  }
  else if (command === '/') {
    return stack.push(stack.pop() / stack.pop());
  }
  else {
    throw new TypeError("Command not defined!!!!!!!!!!!!!!!!!!!");
  }
}
