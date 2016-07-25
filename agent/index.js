#! /usr/bin/env node
const {SSC} = require('serial-servo-control');

const buildMethod = (line) => {
  const args = line.split(' ');
  const name = line[0] == '$' ? args[0].substring(1) : null;
  return {name, args: args.slice(1)};
};

// Serial Servo Controller
let ssc;

//
// Serial Servo Controller - Agent
//
const host = process.env.HOST || 'http://localhost:3666'
var socket = require('socket.io-client')(host);
const send = (result) => {
  socket.emit('command-result', {time: new Date(), result: result});
};

const open = () => {
  console.log('RE-OPENNING');

  try {
    ssc.close();
  } catch (e) {}

  try {
    ssc = new SSC();
    ssc.on('open', () => send('CONNECTED'))
    ssc.on('data', (data) => send(JSON.stringify(data.toString())));
    ssc.on('error', (error) => {
      send(error.stack);
    });
  } catch (error) {
    send(error);
  };
};

socket.on('connect', () => {
  console.log(`Connected - Agent listening at ${host}`);
  console.log('Serial Servo Controller Agent - Press ctrl+c to exit.');
  open();
});

socket.on('disconnect', () => {
  console.log('Oops !!! There is an Error.');
  ssc.close();
});

socket.on('command', (data) => {
  console.log('command', data);
  const {command} = data;

  if (command.length) {
    if ('open' === command) {
      open();
      return;
    }

    const method = buildMethod(command);
    if (ssc[method.name] instanceof Function) {
      console.log(JSON.stringify(method));
      send('done - ' + JSON.stringify(method));
      ssc[method.name](...method.args);
    } else {
      ssc.write(command);
      send('done - ' + command);
    }
  }
});
