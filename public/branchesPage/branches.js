let wsConnection;
let map;
let markers = [];

$(document).ready(function() {
    createMap();
    $("#searchBtn").on("click", () => {
        let searchText = $("#branchSearch").val();
        sendBranchesRequest(searchText);
    });
});

function createMap() {
    let center = new google.maps.LatLng(31.970205,34.771923);
    let mapProp= {
        center: center,
        zoom:10,
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    createWebSocketWithServer();
}

function clearAndSetMarkers(cords) {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
    const infoWindow = new google.maps.InfoWindow();
    cords.map(markerCord => {
        if(markerCord.lat && markerCord.lng) {
            let position = new google.maps.LatLng(markerCord.lat,markerCord.lng);
            let marker = new google.maps.Marker({position: position});
            marker.setMap(map);
            marker.addListener("click", () => {
                infoWindow.close();
                infoWindow.setContent(markerCord.name);
                infoWindow.open(marker.getMap(), marker);
            });
            markers.push(marker);
        }
    });
}

function createWebSocketWithServer() {
    wsConnection = new WebSocket('ws://localhost:80');
    wsConnection.onopen = function () {
        sendBranchesRequest("");
    };
    wsConnection.onerror = function (error) {
        console.log('connection error');
    };
    wsConnection.onmessage = function (message) {
        clearAndSetMarkers(JSON.parse(message.data))
    };
}

function sendBranchesRequest(filter) {
    wsConnection.send(filter);
}