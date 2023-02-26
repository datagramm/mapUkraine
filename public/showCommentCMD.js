let commentLine = document.getElementById('add-comment');
let commentsDiv = document.getElementById('comment-cmd');
let commentsBlock = document.getElementById('third-block');

commentLine.addEventListener('click', event => {

        commentsDiv.style.bottom = '0';
        commentsDiv.style.top = '0';
})
commentsBlock.addEventListener('scroll', event =>{
    commentsDiv.style.bottom = '-30vh';
})
