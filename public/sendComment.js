

function getCoords(event) {
    coords = JSON.stringify(event.layer._latlng);
}

const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${location.host}`);

function pushComment(comment) {

    let subContainer = document.createElement('div');
    subContainer.classList.add('sub-comment-div');


    console.log(comment.userName, comment.textOfComment);
    let userName = document.createElement('div');
    userName.classList.add('userName-comment');
    userName.textContent = comment.userName;

    let textOfComment = document.createElement('div');
    textOfComment.classList.add('text-of-comment');
    textOfComment.textContent = comment.textOfComment;

    let comm = document.createElement('div');
    comm.classList.add('comment');

    subContainer.append(userName, textOfComment);
    comm.append(subContainer);
    document.getElementById('third-block').prepend(comm);
}

let coords;

function pushCommentWebSocket(comment, currentMarkerCoords) {
    console.log(currentMarkerCoords);
    if (currentMarkerCoords == coords) pushComment(comment);
}


let submitComment = document.getElementById('submit-comment');
submitComment.addEventListener('click', event => {
    let textOfComment = document.getElementById('comment-text-submit');

    $.post('/sentComment', {
        textOfComment: textOfComment.value,
        coords: coords,
    }).then(data => socket.send(JSON.stringify({
        comment: data.comment,
        type: 'pushComment',
        coords: data.coords,
    })));
});

let textOfComment = document.getElementById('comment-text-submit');
textOfComment.addEventListener('input', () => {
    socket.send(JSON.stringify({type: 'userIsTypingComment'}))
});

export {getCoords, pushComment, pushCommentWebSocket};