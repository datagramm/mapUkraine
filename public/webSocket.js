import {someFunction} from './pushMarker.js';
import {pushCommentWebSocket} from './sendComment.js';
import {userIsTyping} from './userIsTyping.js';

const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${location.host}`);


socket.onmessage = async (event) => {
    const parseData = await JSON.parse(event.data);
    console.log(parseData);
    if (parseData.type === 'pushMarker') {
        someFunction(parseData.marker.coord, parseData.marker.timer, parseData.marker.timeInMoment, parseData.marker.status1, parseData.marker.status2, parseData.marker.uprate, parseData.marker.downrate);
    }
    if (parseData.type === 'pushComment') {
        pushCommentWebSocket(parseData.comment, parseData.coords);
    }
    if (parseData.type === 'userIsTypingComment') {
        userIsTyping(parseData.userName);
    }

};