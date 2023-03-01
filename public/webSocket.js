import {someFunction} from './pushMarker.js';

const protocol = window.location.protocol.includes('https') ? 'wss': 'ws'
const socket = new WebSocket(`${protocol}://${location.host}`);

socket.onmessage = ( event) => {
    const marker = JSON.parse(event.data);
    console.log('its websocket')
    someFunction(marker.coord, marker.timer, marker.timeInMoment, marker.status1, marker.status2, marker.uprate, marker.downrate);
}