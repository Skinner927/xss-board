#!/usr/bin/env node

// author: takeshix@adversec.com
// modified by: skinner927@gmail.com
(function() {
  'use strict';

  const Zombie = require('zombie');
  const fs = require('fs');
  const chalk = require('chalk');

  Zombie.silent = true;

  let bot = new Zombie();


  // Hookup our listeners
  bot.on('error', function(error){
    console.error(chalk.red('ERROR:'), error);
  });

  bot.on('alert', function(message){
    console.log(chalk.bgMagenta('ALERT -- ALERT -- ALERT'));
    console.log(chalk.magenta(message));
  });

  bot.on('submit', function(){
    console.log(chalk.yellow('Submitting Form'));
  });

  bot.on('redirect', function(request){
    console.log(chalk.bgBlue('Redirect'));
    console.log(request);
  });

  bot.on('link', function(url){
    console.log(chalk.bgBlue('Link'));
    console.log(url);
  });


  // Get all files from the comments directory
  fs.readdirSync('./comments')
    // Pick out just unique user names
    .reduce(function(obj, filename, i, files) {

      let user = filename.split('-')[0];

      obj[user] = true;

      return files.length - 1 === i ? Object.keys(obj) : obj;
    }, {})
    // Loop over each user and visit their page
    .forEach(function(user) {
      console.log(chalk.green.bold('================================='));
      console.log(chalk.green.bold('Visiting: ' + user));

      bot.setCookie({
        name: 'botid',
        value: 'mag1c_c00k1e007',
        domain: 'localhost'
      });
      bot.setCookie({
        name: 'name',
        value: user,
        domain: 'localhost'
      });

      //bot.debug();
      bot.visit("http://localhost:8081/", function() {
        bot.fill("username", "admin").fill("comment", "hilarious!").pressButton("Post it!", function() {})
      });
    });

})();
