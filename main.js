var stack; //TODO: make stack local
var stackModeNumbers = true;

function toggleStackMode() {
  stackModeNumbers = !stackModeNumbers;
  document.getElementById('stack').innerHTML = printStack();
}

function printStack(stack) {
  if (stackModeNumbers) {
    return stack;
  } else {
    return stack.map(element => String.fromCharCode(element)).join("");
  }
}

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
    document.getElementById('stack').innerHTML = printStack(stack);
    for (var j = 0; j < 9; j++) { // 10 instructions, then a frame drawn
      if (commandNum < code.length) {
        commandNum = execute(code[commandNum++], commandNum, code);
        document.getElementById('stack').innerHTML = printStack(stack);
      }
    }
    if (commandNum < code.length) requestAnimationFrame(count);
  }
  if (commandNum < code.length) requestAnimationFrame(count);
}

function execute(command, num, cod) {
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
  else if (command === '`') {
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
    if (stack.pop()) { // pop and jump conditionally
      num = cod.lastIndexOf('¿', num); // search backwards for the first ¿ before a ?
      if (num === -1) error("'?' has no matching '¿'!");
    }
  }
  else if (command === '!') {
     num = cod.lastIndexOf('¡', num); // ! jumps unconditionally!
     if (num === -1) error("'!' has no matching '¡'!"); 
  }
  else if (command === '«') {
    stack.push(stack.shift());
  }
  else if (command === '»') {
    stack.unshift(stack.pop());
  }
  else if (command === '#') {
    stack.push(stack.length);
  }
  else if (!["¿","¡"].includes(command)) { // don't error on nops
    return error("Command " + command + " is not defined!!!!!!!!!!!!!!!!!!! (at position " + num + ")");
  }
  return num;
}

function error(err) {
  document.getElementById('error').innerHTML += err + "<br>";
  return Infinity;
}
