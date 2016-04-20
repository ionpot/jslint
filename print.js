"use strict";

var echo = require('./echo.js');

var leadws = /^[\t\ ]+/;

function countWs(str) {
    var match = str.match(leadws);

    if (match) {
        return match[0].length;
    }

    return 0;
}

module.exports = function (w, lines) {
    var num = w.line;
    var col = w.column;

    var head = num + 1 + ': ';
    var hlen = head.length;

    var line = lines[num];
    var ws = countWs(line);

    var caret = [];
    var msg = [];

    caret.length = hlen + col - ws;
    caret.push('^');

    msg.length = hlen;
    msg.push(w.message);

    echo(head + line.slice(ws));
    echo(caret.join(' '));
    echo(msg.join(' '));
};
