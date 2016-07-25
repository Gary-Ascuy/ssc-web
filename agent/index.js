#! /usr/bin/env node

//
// Serial Servo Controller - Agent
//
const host = process.env.HOST || 'http://localhost:3666'
var socket = require('socket.io-client')(host);
socket.on('connect', () => {
  console.log(`Connected - Agent listening at ${host}`);
  console.log('Serial Servo Controller Agent - Press ctrl+c to exit.');
});
socket.on('disconnect', () => {
  console.log('Oops !!! There is an Error.')
});

socket.on('command', (data) => {
  console.log('command', data);
  setTimeout(() => {
    socket.emit('command-result', {time: new Date(), result: data.command});
  }, 500);
});
