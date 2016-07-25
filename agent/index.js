#! /usr/bin/env node

//
// Serial Servo Controller - Agent
//
var socket = require('socket.io-client')('http://localhost:3666');
socket.on('connect', () => {});
socket.on('disconnect', () => {});

socket.on('command', (data) => {
  console.log('command', data);
  setTimeout(() => {
    socket.emit('command-result', {time: new Date(), result: data.command});
  }, 500);
});
