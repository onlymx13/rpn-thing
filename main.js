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
  document.getElementById('error').innerHTML = '';
  stack = document.getElementById('input').value.split('\n').filter(n =>  n != '').map(x => Number(x)); // Input is just the original stack
  function count() {
        for (var j = 0; j < 9; j++) { // 10 instructions, then a frame drawn
            if (commandNum < code.length) {
              commandNum = execute(code[commandNum++], commandNum, code);
            }
        }
        if (commandNum < code.length) requestAnimationFrame(count);
    }
    if (commandNum < code.length) requestAnimationFrame(count);
}

function execute(command, num, cod) {
  document.getElementById('stack').innerHTML = stack;
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
    if (stack.pop()) {
      num = cod.lastIndexOf('¿', num); // search backwards for the first ¿ before a ?
      if (num === -1) error("'?' has no matching '¿'!");
    }
  }
  else if (!["¿"].includes(command)) { // don't error on nops
    error("Command " + command + " is not defined!!!!!!!!!!!!!!!!!!!");
  }
  return num;
}

function error(err) {
  document.getElementById('error').innerHTML += error + "\n";
}
