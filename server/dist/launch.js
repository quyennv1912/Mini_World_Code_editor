"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = void 0;
var rpc = __importStar(require("vscode-ws-jsonrpc"));
var server = __importStar(require("vscode-ws-jsonrpc/lib/server"));
var vscode_languageserver_1 = require("vscode-languageserver");
var path_1 = require("path");
var isInitializeRequest = function (message) {
    return message.method === vscode_languageserver_1.InitializeRequest.type.method;
};
var launch = function (socket) {
    var reader = new rpc.WebSocketMessageReader(socket);
    var writer = new rpc.WebSocketMessageWriter(socket);
    var socketConnection = server.createConnection(reader, writer, function () {
        return socket.dispose();
    });
    var serverConnection = server.createServerProcess('Lua', (0, path_1.resolve)(process.cwd(), 'lua-language-server/.bin/Linux/lua-language-server'));
    server.forward(socketConnection, serverConnection, function (message) {
        if (rpc.isRequestMessage(message) && isInitializeRequest(message)) {
            message.params.processId = process.pid;
        }
        return message;
    });
};
exports.launch = launch;
