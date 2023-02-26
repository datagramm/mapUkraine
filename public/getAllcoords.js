import {someFunction} from "./pushMarker.js";

function getAllCoords() {
    fetch('/getAllCoords')
        .then(res => res.json())
        .then((res) => {
            const markers = res.markers;
            markers.forEach(marker => {
                someFunction(marker.coord, marker.timer, marker.timeInMoment, marker.status1, marker.status2, marker.uprate, marker.downrate)
            })
            document.getElementById('account-image-outer').src = `data:${res.image.contentType};base64,${res.image.buffer}`;
        });
}
getAllCoords();

export {getAllCoords};