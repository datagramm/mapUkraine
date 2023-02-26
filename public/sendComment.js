function getCoords(event) {
    coords = JSON.stringify(event.layer._latlng);
}

function pushComment(comment) {

    let subContainer = document.createElement('div');
    subContainer.classList.add('sub-comment-div');


    console.log(comment.userName, comment.textOfComment)
    let userName = document.createElement('div');
    userName.classList.add('userName-comment');
    userName.textContent = comment.userName;

    let textOfComment = document.createElement('div');
    textOfComment.classList.add('text-of-comment');
    textOfComment.textContent = comment.textOfComment;

    let comm = document.createElement('div')
    comm.classList.add('comment');

    subContainer.append(userName, textOfComment)
    comm.append(subContainer);
    document.getElementById('third-block').prepend(comm);
}

let coords;
let submitComment = document.getElementById('submit-comment');
submitComment.addEventListener('click', event => {
    let textOfComment = document.getElementById('comment-text-submit');

    $.post('/sentComment', {
        textOfComment: textOfComment.value,
        coords: coords,
    }).then(comment => pushComment(comment))
})

export {getCoords, pushComment}