"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var launch_1 = require("./launch");
// If you change the port, make sure to also change it for the client!
var port = 8080;
new ws_1.WebSocketServer({ port: port }).on("connection", function (webSocket) {
    console.log("connected");
    var socket = {
        send: function (content) {
            return webSocket.send(content, function (error) {
                if (error)
                    throw error;
            });
        },
        onMessage: function (callback) { return webSocket.on("message", callback); },
        onError: function (callback) { return webSocket.on("error", callback); },
        onClose: function (callback) { return webSocket.on("close", callback); },
        dispose: function () { return webSocket.close(); },
    };
    if (webSocket.readyState === webSocket.OPEN) {
        (0, launch_1.launch)(socket);
    }
    else {
        webSocket.on("open", function () { return (0, launch_1.launch)(socket); });
    }
});
