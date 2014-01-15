var rl = require('readline').createInterface(process.stdin, process.stdout,completer);

rl.setPrompt('OHAI> ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

function completer(line) {
  var completions = '.help hello'.split(' ');
  var hits = completions.filter(function(c) { return c.indexOf(line) === 0; });
  // show all completions if none found
  return [hits.length ? hits : completions, line];
}
