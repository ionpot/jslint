"use strict";

var os = require('os');

module.exports = function () {
    var arr = [];
    var i = 0;

    var token;

    while (i < arguments.length) {
        token = String(arguments[i]);

        if (token === '') {
            token = "''";
        }

        arr.push(token);

        i += 1;
    }

    process.stdout.write(arr.join(' ') + os.EOL);
};
