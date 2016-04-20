"use strict";

var lint = require('./jslint.js');

var echo = require('./echo.js');
var R = require('./freader.js');
var print = require('./print.js');
var getOptions = require('./opts.js');

function echoCount(out, file) {
    var count = out.warnings.length;
    var str = count + ' warning';

    if (count > 1) {
        str += 's';
    }

    if (file) {
        str = file + ' has ' + str;
    }

    echo(str + ':');
    echo();
}

function echoW(out) {
    out.warnings.forEach(function (w) {
        print(w, out.lines);
        echo();
    });

    if (out.stop) {
        echo('Stopped.');
    }
}

function lintFile(file, opts) {
    R.read(file, function (text) {
        var out = lint(text, opts);

        if (out.ok) {
            echo(file, 'is ok.');

        } else {
            echoCount(out, file);
            echoW(out);
        }

    }, function (code) {
        echo(file, code);
    });
}

getOptions(function (opts, files) {
    if (files.length) {
        files.forEach(function (file) {
            lintFile(file, opts);
        });

    } else {
        R.readStream(process.stdin, function (text) {
            var out = lint(text, opts);

            if (out.ok) {
                echo('Ok.');

            } else {
                echoCount(out);
                echoW(out);
            }
        });
    }
});
