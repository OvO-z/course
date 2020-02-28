/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

import {  BrowserWindow } from 'electron'

// Install `electron-debug` with `devtron`
require('electron-debug')()

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
    let toolsPath = "C:\\Users\\24367\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\ljjemllljcmogpfapbkkighbhhppjdbg\\5.0.0.6_0";
    let toolName = BrowserWindow.addDevToolsExtension(toolsPath);
    console.log("扩展名", toolName)

})

// Require `main` process to boot app
require('./index')
