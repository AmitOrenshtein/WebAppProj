$(document).ready(function() {
    createMap();
});

function createMap() {
    let center = new google.maps.LatLng(31.970205,34.771923);
    let mapProp= {
        center: center,
        zoom:10,
    };
    let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    getMarkersFromServer().then(function (cords) {
       cords.map(markerCord => {
           if(markerCord.lat && markerCord.lng) {
               let position = new google.maps.LatLng(markerCord.lat,markerCord.lng);
               let marker = new google.maps.Marker({position: position});
               marker.setMap(map);
           }
       });
    });
}

function getMarkersFromServer() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "GET",
            url:"http://localhost:80/branches",
            success: function(data){
                resolve(data);
            },
            error: function (XMLHttpRequest, textStatus, error) {
                console.log(error);
                reject(error);
            }
        });
    });
}