const userIsTypingAnimation = () => {
    for (let i = 0; i <= 2; i++){
       const dot = document.createElement('div');
       dot.classList.add('typing-dots');
        document.getElementById('typing-tooltip-animation').append(dot);
    }


}
userIsTypingAnimation();