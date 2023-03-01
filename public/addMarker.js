
import {getCurrentTime} from "./getCurrentTime.js";
import {someFunction} from "./pushMarker.js";

const socket = new WebSocket('ws://localhost:3000')

const addMarker  = (e) => {
    let time = getCurrentTime();

    // let coord = e.latlng.toString().split(',');
    // let lat = coord[0].split('(');
    // let lng = coord[1].split(')');
    let coord = JSON.stringify(e.latlng)
    let timeInMoment = Math.round(new Date().getTime() / 1000)
    let hours = new Date().getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = new Date().getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let timeOfMarkerInPanel = hours + ":" + minutes;
    console.log(coord)





    $.post("/request", {
            coords: coord,
            countTime: 1800,
            timeInMoment: timeInMoment,
            status1: 'pending',
            status2: 'reject',
            uprate: 0,
            downrate: 0,
            timeOfMarkerInPanel: timeOfMarkerInPanel,
        }
    ).then(marker => {someFunction(marker.coord, marker.timer, marker.timeInMoment, marker.status1, marker.status2, marker.uprate, marker.downrate)


            socket.send(JSON.stringify({
                coord: marker.coord,
                timer: marker.timer,
                timeInMoment: marker.timeInMoment,
                status1: marker.status1,
                status2: marker.status2,
                uprate: marker.uprate,
                downrate: marker.downrate,
            }))


    })



    // someFunction(coord, 1800, time)

}
export {addMarker}