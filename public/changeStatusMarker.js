/* eslint-disable */
import {map} from './getSelfPosition.js';
import {getAllCoords} from "./getAllcoords.js";
import {getCoords} from "./sendComment.js";

let tooltip;

const hideMenu = () => {
    document.getElementById('bottomPanel').style.top = '97%'
}
map.on('zoomstart', hideMenu)

let event2;
function changeStatus(ev) {
     event2 =  ev;
     getCoords(event2);
    document.getElementById('bottomPanel').style.top = '30%';
    map.off('zoomstart', hideMenu)
    if (tooltip !== undefined) {
        tooltip.lastChild.style.transform = 'scale(1)'
    }
    tooltip = document.getElementById(`leaflet-tooltip-${ev.layer._tooltip._leaflet_id}`);
    tooltip.lastChild.style.transform = 'scale(1.5)'




    document.getElementById('bottomPanel').addEventListener('click', status)

}

const status = (event) => {

        let approvButton = event.target.closest('#approv-sub');
        let rejectButton = event.target.closest('#reject-sub');
    console.log(Number(tooltip.lastChild.lastChild.firstChild.textContent))

    if (approvButton) {

        document.getElementById('bottomPanel').removeEventListener('click', status)
        $.post("/changeRate", {
            coord: JSON.stringify(event2.layer._latlng),
            up: true,
        }).then( marker => {
            tooltip.lastChild.lastChild.firstChild.textContent = marker.uprate,
            tooltip.lastChild.firstChild.className = marker.status1,
            tooltip.lastChild.firstChild.firstChild.className = marker.status2
        });

        tooltip.lastChild.style.transform = 'scale(1)'

        // tooltip.lastChild.lastChild.firstChild.textContent = Number(tooltip.lastChild.lastChild.firstChild.textContent) + 1
        map.on('zoomstart', hideMenu)
    }
    else if (rejectButton){

        document.getElementById('bottomPanel').removeEventListener('click', status)
        $.post("/changeRate", {
            coord: JSON.stringify(event2.layer._latlng),
            up: false,
        }).then(marker => {
            tooltip.lastChild.lastChild.lastChild.textContent = marker.downrate,
            tooltip.lastChild.firstChild.className = marker.status1,
            tooltip.lastChild.firstChild.firstChild.className = marker.status2
        })

        tooltip.lastChild.style.transform = 'scale(1)'


        map.on('zoomstart', hideMenu)
    }

}


export {changeStatus};