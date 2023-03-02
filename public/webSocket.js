import {someFunction} from './pushMarker.js';

const protocol = window.location.protocol.includes('https') ? 'wss': 'ws'
const socket = new WebSocket(`${protocol}://${location.host}`);

socket.onmessage = async ( event) => {
    const parseData = await JSON.parse(event.data);
    console.log(parseData);
    someFunction(parseData.marker.coord, parseData.marker.timer, parseData.marker.timeInMoment, parseData.marker.status1, parseData.marker.status2, parseData.marker.uprate, parseData.marker.downrate);
}