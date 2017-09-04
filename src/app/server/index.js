"use strict";

var express = require('express');
var server = require('./server');

const PORT = process.env.PORT || 3000;

express().use('/', server()).listen(PORT, function() {
    if (process.env.NODE_ENV === "development") {
      console.log(`Server started at http://localhost:${PORT}/demo/checkout`);
    }
});
