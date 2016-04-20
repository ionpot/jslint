"use strict";

var opts = require('./config.json');

var args = process.argv.slice(2);

module.exports = function (done) {
    var files = [];

    args.forEach(function (arg) {
        var o, val;

        if (arg.indexOf('--') === 0) {
            o = arg.slice(2).split('=');
            val = o[1];

            opts[o[0]] = val
                ? +val
                : true;

        } else {
            files.push(arg);
        }
    });

    done(opts, files);
};
