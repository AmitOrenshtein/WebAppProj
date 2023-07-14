const ws = require('websocket').server;
const branchesController = require('../controllers/branch');

function listenToWebSocketServer(httpServer) {
    const wsServer = new ws({httpServer: httpServer});

    wsServer.on('request', function(request) {
        let connection = request.accept(null, request.origin);
        connection.on("message", data => {
            branchesController.getBranchesByWS(connection, data.utf8Data);
        });
    });
}

module.exports = {
    listenToWebSocketServer
}