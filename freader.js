"use strict";

var fs = require('fs');

module.exports = {
    open: function (path, done, fail) {
        var stream = fs.createReadStream(path, {"encoding": "utf8"});

        stream.on('error', function (err) {
            fail(err.code);
        });

        stream.on('open', function () {
            done(stream);
        });
    },
    readStream: function (stream, done) {
        var contents = '';

        stream.setEncoding('utf8');

        stream.on('data', function (chunk) {
            contents += chunk;
        });

        stream.on('end', function () {
            done(contents);
        });
    },
    read: function (path, done, fail) {
        var self = this;

        self.open(path, function (stream) {
            self.readStream(stream, done);
        }, fail);
    }
};
