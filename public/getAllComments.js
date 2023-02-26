import {pushComment} from "./sendComment.js";
import {getCurrentTimeOfMarket} from "./getCurrentTimeOfMarket.js";

function getAllCommentsOfCurrentMarket(event) {
     document.getElementById('comment-cmd').style.top = '30vh'
    while (document.getElementById('third-block').contains(document.querySelector('.comment'))){
        document.getElementById('third-block').removeChild(document.getElementById('third-block').firstChild)
    }

    $.post('/getAllComments', {
        coord: JSON.stringify(event.layer._latlng),
    }).then(marker => {
        marker.comments.forEach( comment => pushComment(comment))
        getCurrentTimeOfMarket(marker.timeOfMarkerInPanel);
    })

}

export {getAllCommentsOfCurrentMarket}